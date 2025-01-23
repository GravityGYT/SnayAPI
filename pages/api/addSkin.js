import { MongoClient } from "mongodb";
import { nanoid } from "nanoid"; // Use nanoid for generating unique IDs

const MONGO_URI = process.env.MONGO_URI; // Ensure this is set in the environment variables
let cachedClient = null;

export default async function handler(req, res) {
    try {
        // Add CORS headers
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        // Only allow POST requests
        if (req.method !== "POST") {
            res.setHeader("Allow", ["POST"]);
            return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }

        if (!MONGO_URI) {
            throw new Error("MONGO_URI environment variable is not defined");
        }

        // Connect to MongoDB if not already connected
        if (!cachedClient) {
            cachedClient = await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true });
        }

        const db = cachedClient.db("SkinList"); // Database name
        const collection = db.collection("skins"); // Collection name

        // Parse and validate request body
        const { name, url } = req.body;
        if (!name || !url) {
            return res.status(400).json({ error: "Fields 'name' and 'url' are required." });
        }

        // Validate URL format
        const validImgurUrl = /^https:\/\/i\.imgur\.com\/.*\.(png|jpeg|jpg)$/;
        if (!validImgurUrl.test(url)) {
            return res.status(400).json({
                error: "URL must start with 'https://i.imgur.com' and end with '.png', '.jpeg', or '.jpg'.",
            });
        }

        // Convert .jpeg or .jpg to .png
        let finalUrl = url;
        if (finalUrl.endsWith(".jpeg") || finalUrl.endsWith(".jpg")) {
            finalUrl = finalUrl.replace(/\.jpe?g$/, ".png");
        }

        // Generate a random string for _id
        const _id = nanoid(10); // Generates a random string with a length of 10 characters

        // Insert new document
        const newSkin = { _id, name, url: finalUrl, createdAt: new Date() };
        const result = await collection.insertOne(newSkin);

        return res.status(201).json({ message: "Skin added successfully.", id: result.insertedId });
    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
}
