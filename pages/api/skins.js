import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI; // Properly reference the environment variable

// Cached connection to reuse for performance
let cachedClient = null;

export default async function handler(req, res) {
    try {
        // Only allow GET requests
        if (req.method !== "GET") {
            res.setHeader("Allow", ["GET"]);
            return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }

        // Check if MONGO_URI is set
        if (!MONGO_URI) {
            throw new Error("MONGO_URI environment variable is not defined");
        }

        // Connect to MongoDB only if not already connected
        if (!cachedClient) {
            cachedClient = await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true });
        }

        const db = cachedClient.db("SkinList"); // Database name
        const collection = db.collection("skins"); // Collection name

        // Fetch all documents from the "skins" collection
        const skins = await collection.find({}).toArray();

        // Send the fetched skins as JSON
        res.status(200).json(skins);
    } catch (error) {
        console.error("Error fetching skins:", error); // Log the error for debugging
        res.status(500).json({ error: error.message || "Failed to fetch skins from the database" });
    }
}
