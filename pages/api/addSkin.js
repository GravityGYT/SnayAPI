import { MongoClient } from "mongodb";
import { nanoid } from "nanoid";

const MONGO_URI = process.env.MONGO_URI;

let cachedClient = null;

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

    try {
        const { name, owner, url } = req.body;

        if (!name || !owner || !url.startsWith('https://i.imgur.com')) {
            return res.status(400).json({ error: "URL must start with 'https://i.imgur.com'" });
        }

        let finalUrl = url;
        if (finalUrl.endsWith('.jpeg') || finalUrl.endsWith('.jpg')) {
            finalUrl = finalUrl.replace(/\.jpe?g$/, '.png');
        }

        if (!cachedClient) {
            cachedClient = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
            await cachedClient.connect();
        }

        const db = cachedClient.db("snay");
        const skinsCollection = db.collection("skins");

        const skinData = {
            id: nanoid(),
            name,
            owner,
            url: finalUrl,
            createdAt: new Date(),
        };

        await skinsCollection.insertOne(skinData);
        return res.status(200).json({ success: true, id: skinData.id, imageUrl: finalUrl });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
