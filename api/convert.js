export default async function handler(req, res) {
  // Enable CORS for your GitHub Pages domain
  res.setHeader('Access-Control-Allow-Origin', 'https://lushpurr.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
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