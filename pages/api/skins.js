import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    try {
        // Resolve the path to the JSON file
        const filePath = path.join(process.cwd(), 'public', 'skins.json');

        // Read the JSON file
        const data = await fs.readFile(filePath, 'utf8');
        const skins = JSON.parse(data);

        // Send the data as JSON
        res.status(200).json(skins);
    } catch (error) {
        console.error('Error reading skins JSON file:', error);
        res.status(500).json({ error: 'Failed to load skins.' });
    }
}
