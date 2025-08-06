export default async function handler(req, res) {
  // Enable CORS for your GitHub Pages domain
  res.setHeader('Access-Control-Allow-Origin', 'https://yourusername.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
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