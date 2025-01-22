import { MongoClient } from "mongodb";
import { nanoid } from "nanoid";

// Environment variables
const MONGO_URI = process.env.MONGO_URI; // MongoDB connection string

let cachedClient = null;

export default async function handler(req, res) {
    // Add CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { name, owner, url } = req.body;

        // Validate required fields
        if (!name || !owner || !url) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Validate that the URL starts with https://i.imgur.com
        if (!url.startsWith("https://i.imgur.com")) {
            return res.status(400).json({ error: "URL must start with https://i.imgur.com" });
        }

        // Check if the URL ends with .jpeg and replace it with .png
        let finalUrl = url;
        if (finalUrl.endsWith(".jpeg")) {
            finalUrl = finalUrl.replace(".jpeg", ".png");
        }

        // Connect to MongoDB
        if (!cachedClient) {
            cachedClient = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
            await cachedClient.connect();
        }

        const db = cachedClient.db("snay");
        const skinsCollection = db.collection("skins");

        // Create the skin entry
        const skinData = {
            id: nanoid(),
            name,
            owner,
            url: finalUrl, // Final validated and modified URL
            createdAt: new Date(),
        };

        await skinsCollection.insertOne(skinData);

        return res.status(200).json({ success: true, id: skinData.id, imageUrl: finalUrl });
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
