import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI; // Ensure this is set in the environment variables
let cachedClient = null;

export default async function handler(req, res) {
    try {
        // Add CORS headers
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        // Handle preflight OPTIONS request
        if (req.method === "OPTIONS") {
            return res.status(200).end();
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

        if (req.method === "GET") {
            // Fetch all documents without pagination
            const skins = await collection.find({}).toArray();
            return res.status(200).json({ data: skins }); // Return the data directly
        }

        if (req.method === "POST") {
            const { name, url } = req.body;

            // Validate the POST request body
            if (!name || !url) {
                return res.status(400).json({ error: "Fields 'name' and 'url' are required." });
            }

            // Validate URL format
            const validImgurUrl = /^https:\/\/i\.imgur\.com\/.*\.png$/;
            if (!validImgurUrl.test(url)) {
                return res.status(400).json({
                    error: "URL must start with 'https://i.imgur.com' and end with '.png'.",
                });
            }

            // Insert new skin into the database
            const newSkin = { name, url, owner, createdAt: new Date() };
            const result = await collection.insertOne(newSkin);

            return res.status(201).json({
                message: "Skin added successfully.",
                id: result.insertedId,
            });
        }

        // Handle unsupported methods
        res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
}
