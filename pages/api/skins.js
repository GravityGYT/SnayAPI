import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI; // Ensure this is correctly set
if (!uri) {
  throw new Error('MONGO_URI environment variable not set');
}

const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db('Snayskins'); // Replace with your database name
    const collection = db.collection('skins'); // Replace with your collection name

    if (req.method === 'GET') {
      const skins = await collection.find({}).toArray();
      res.status(200).json(skins);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in /api/skins:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
