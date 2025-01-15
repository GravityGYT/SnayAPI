import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    try {
        const filePath = path.join(process.cwd(), 'public', 'skins.json');
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const skins = JSON.parse(fileContent);
        
        res.status(200).json(skins);
    } catch (error) {
        console.error('Error reading skins.json:', error);
        res.status(500).json({ error: 'Failed to load skins data.' });
    }
}
