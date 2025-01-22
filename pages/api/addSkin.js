import { MongoClient } from "mongodb";
import { nanoid } from "nanoid";
import fetch from "node-fetch"; // Ensure node-fetch is installed

// Environment variables
const MONGO_URI = process.env.MONGO_URI; // MongoDB connection string
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID; // Imgur Client ID for non-authenticated uploads

let cachedClient = null;

export default async function handler(req, res) {
    try {
        // Add CORS headers
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method Not Allowed" });
        }

        const { name, owner, image, url } = req.body;

        // Validate required fields
        if (!name || !owner || (!image && !url)) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        let finalUrl;

        // If an image is provided, upload it to Imgur
        if (image) {
            console.log("Uploading image to Imgur...");

            const imgurResponse = await fetch("https://api.imgur.com/3/image", {
                method: "POST",
                headers: {
                    Authorization: `Client-ID ${IMGUR_CLIENT_ID}`, // Use Client-ID for non-authenticated uploads
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image, type: "base64" }), // Image in Base64 format
            });

            const imgurData = await imgurResponse.json();

            if (!imgurData.success) {
                console.error("Imgur upload failed:", imgurData);
                return res.status(500).json({ error: "Failed to upload image to Imgur" });
            }

            finalUrl = imgurData.data.link; // Get the Imgur URL

            // Replace .jpeg with .png in the Imgur URL if necessary
            if (finalUrl.endsWith(".jpeg")) {
                finalUrl = finalUrl.replace(".jpeg", ".png");
            }
        } else {
            // If no image is provided, use the provided URL
            console.log("Using provided URL...");
            finalUrl = url;

            // Replace .jpeg with .png in the provided URL if necessary
            if (finalUrl.endsWith(".jpeg")) {
                finalUrl = finalUrl.replace(".jpeg", ".png");
            }
        }

        // Connect to MongoDB
        const client = cachedClient || new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        if (!cachedClient) await client.connect();
        cachedClient = client;

        const db = client.db("snay");
        const skinsCollection = db.collection("skins");

        // Create the skin entry
        const skinData = {
            id: nanoid(),
            name,
            owner,
            url: finalUrl, // Either Imgur URL or modified provided URL
            createdAt: new Date(),
        };

        await skinsCollection.insertOne(skinData);

        return res.status(200).json({ success: true, id: skinData.id, imageUrl: finalUrl });
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
