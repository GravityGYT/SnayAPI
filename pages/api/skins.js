import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    try {
        const client = await MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true });
        const db = client.db("SkinList"); // Ensure this matches your database name
        const collection = db.collection("SnayAPI"); // Ensure this matches your collection name

        const skins = await collection.find({}).toArray();
        res.status(200).json(skins);
    } catch (error) {
        console.error("Error fetching skins:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
