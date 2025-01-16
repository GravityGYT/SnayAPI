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

        if (!cachedClient) {
            cachedClient = await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true });
        }

        const db = cachedClient.db("SkinList");
        const collection = db.collection("skins");

        // Implement pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const skins = await collection.find({}).skip(skip).limit(limit).toArray();
        const total = await collection.countDocuments();

        res.status(200).json({
            data: skins,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error("Error fetching skins:", error);
        res.status(500).json({ error: error.message || "Failed to fetch skins from the database" });
    }
}
