// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to fetch hotels by city
app.get('/api/hotels', async (req, res) => {
    const { city } = req.query;
    const API_KEY = process.env.PRICE_API_KEY;
    const API_HOST = 'priceline-com.p.rapidapi.com';

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const url = `https://${API_HOST}/hotels/city/search?q=${encodeURIComponent(city)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Failed to fetch hotels');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
