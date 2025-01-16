import { MongoClient } from 'mongodb';

let client;
let clientPromise;

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error('MONGO_URI environment variable not defined');
}

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('Snayskins'); // Replace with your database name
    const collection = db.collection('skins'); // Replace with your collection name

    if (req.method === 'GET') {
      const skins = await collection.find({}).toArray();
      res.status(200).json(skins);
    } else if (req.method === 'POST') {
      const { name, url } = req.body;

      if (!name || !url) {
        return res.status(400).json({ error: 'Name and URL are required' });
      }

      const result = await collection.insertOne({ name, url });
      res.status(201).json({ message: 'Skin added', id: result.insertedId });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
