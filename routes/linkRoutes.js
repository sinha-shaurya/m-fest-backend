import express from 'express';
import fs from 'fs/promises'; // Use fs/promises for async/await
import path from 'path';

const router = express.Router();

// Load JSON data using fs
const loadLinkData = async () => {
    const dataPath = path.resolve('data', 'link.json'); // Adjust path if needed
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
};

router.get('/', async (req, res) => {
    try {
        const linkData = await loadLinkData();
        res.json(linkData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load data' });
    }
});

export default router;
