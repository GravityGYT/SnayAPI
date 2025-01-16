import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI; // Ensure this is set in the environment variables
let cachedClient = null;

export default async function handler(req, res) {
    try {
        // Add CORS headers
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET");

        if (req.method !== "GET") {
            res.setHeader("Allow", ["GET"]);
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

        // Fetch all documents without pagination
        const skins = await collection.find({}).toArray();

        res.status(200).json({ data: skins }); // Return the data directly
    } catch (error) {
        console.error("Error fetching skins:", error);
        res.status(500).json({ error: error.message || "Failed to fetch skins from the database" });
    }
}
