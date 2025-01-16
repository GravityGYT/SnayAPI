import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI; // Store your MongoDB URI in environment variables
const client = new MongoClient(uri);
const dbName = "Snayskins"; // Your database name
const collectionName = "skins"; // Your collection name

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Fetch all skins
    try {
      await client.connect();
      const db = client.db(dbName);
      const skins = await db.collection(collectionName).find().toArray();
      res.status(200).json(skins);
    } catch (error) {
      console.error("Error fetching skins:", error);
      res.status(500).json({ message: "Failed to fetch skins" });
    } finally {
      await client.close();
    }
  } else if (req.method === "POST") {
    // Add a new skin
    const { name, url } = req.body;
    if (!name || !url) {
      return res.status(400).json({ message: "Name and URL are required" });
    }

    try {
      await client.connect();
      const db = client.db(dbName);
      const newSkin = { name, url };
      await db.collection(collectionName).insertOne(newSkin);
      res.status(201).json({ message: "Skin added successfully", newSkin });
    } catch (error) {
      console.error("Error adding skin:", error);
      res.status(500).json({ message: "Failed to add skin" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
