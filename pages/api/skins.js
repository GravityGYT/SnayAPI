import { MongoClient } from "mongodb";

const MONGO_URI = "process.env.MONGO_URI";

// Cached connection to reuse for performance
let cachedClient = null;

export default async function handler(req, res) {
    try {
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
        console.error("Error fetching skins:", error.message);
        res.status(500).json({ error: "Failed to fetch skins from the database" });
    }
}
