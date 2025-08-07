import { CosmosClient } from "@azure/cosmos";
import { VercelRequest, VercelResponse } from "@vercel/node";

const client = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT!,
    key: process.env.COSMOS_KEY!
})

const container = client
    .database('currencyApp')
    .container('conversionHistory');

export default async function handler(req: VercelRequest, res:VercelResponse){
    const origin = req.headers.origin ?? '';
    const allowedOrigins = [
        'http://localhost:4200',  // Angular dev server
        'https://lushpurr.github.io'  // Your GitHub Pages URL
    ]

    if(allowedOrigins.includes(origin)){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        try {
        const { resources: items } = await container.items.query('SELECT * FROM c').fetchAll();
        res.status(200).json(items);
        } catch (error) {
        res.status(500).json({ error: 'Failed to fetch conversions' });
        }
    } else {
        res.status(405).end();
    }
}