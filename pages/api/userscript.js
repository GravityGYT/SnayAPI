import { promises as fs } from 'fs';
import { join } from 'path';

export default async function handler(req, res) {
    const filePath = join(process.cwd(), 'public', 'mainscript.js');
    try {
        const scriptContent = await fs.readFile(filePath, 'utf8');
        res.setHeader('Content-Type', 'application/javascript');
        res.send(scriptContent);
    } catch (error) {
        res.status(500).send(`Error reading script: ${error.message}`);
    }
}
