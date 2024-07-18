const router = require('express').Router();

const apiKey = process.env.AMADEUS_API_KEY;
const apiUrl = 'https://test.api.amadeus.com/v1/shopping/flight-offers';

app.get('/api/flights', async (req, res) => {
  try {
    const response = await fetch(`${apiUrl}?origin=NYC&destination=LON&apikey=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});