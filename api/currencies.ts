import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS for both localhost and GitHub Pages
  const origin = req.headers.origin ?? '';
  const allowedOrigins = [
    'http://localhost:4200',  // Angular dev server
    'https://yourusername.github.io'  // Your GitHub Pages URL
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  const { type = 'flat' } = req.query;
  
  try {
    const response = await fetch(
      `https://api.currencybeacon.com/v1/currencies?type=${type}&api_key=${process.env.API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch currency data' });
  }
}
