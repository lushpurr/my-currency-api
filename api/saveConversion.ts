
import { CosmosClient } from "@azure/cosmos";
import { VercelRequest, VercelResponse } from "@vercel/node";

const client = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT!,
    key: process.env.COSMOS_KEY!
})

// creates db and container
const container = client
    .database('currencyApp')
    .container('conversionHistory');


export default async function handler(req: VercelRequest, res: VercelResponse){
    if(req.method === 'POST'){
        const { fromCurrency, toCurrency, amount, result } = req.body;

        const item = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        fromCurrency,
        toCurrency,
        amount,
        result,
        };

        await container.items.create(item);
        res.status(200).json({ message: 'Saved' });

    } else {
        res.status(405).end();

    }
}