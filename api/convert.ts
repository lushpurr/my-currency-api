

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin ?? '';
  const allowedOrigins = [
    'http://localhost:4200',
    'https://yourusername.github.io'
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  const { from, to, amount } = req.query;

  // Type-check query params, they come as string | string[] | undefined
  if (
    typeof from !== 'string' ||
    typeof to !== 'string' ||
    typeof amount !== 'string'
  ) {
    return res.status(400).json({ error: 'Missing or invalid required parameters: from, to, amount' });
  }
  
  try {
    const response = await fetch(
      `https://api.currencybeacon.com/v1/convert?from=${from}&to=${to}&amount=${amount}&api_key=${process.env.API_KEY}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to convert currency' });
  }
}
