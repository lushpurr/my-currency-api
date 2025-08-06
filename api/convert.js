export default async function handler(req, res) {
  // Same CORS setup
  const origin = req.headers.origin;
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
  
  if (!from || !to || !amount) {
    return res.status(400).json({ error: 'Missing required parameters: from, to, amount' });
  }
  
  try {
    const response = await fetch(
      `https://api.currencybeacon.com/v1/convert?from=${from}&to=${to}&amount=${amount}&api_key=${process.env.API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to convert currency' });
  }
}