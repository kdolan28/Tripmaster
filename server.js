import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE_URL = 'booking-com.p.rapidapi.com';
const API_KEY = process.env.RAPIDAPI_KEY;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to fetch hotels by city
app.get('/api/hotels', async (req, res) => {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const url = `https://${API_BASE_URL}/v2/hotels/search?order_by=popularity&filter_by_currency=AED&include_adjacency=true&children_number=2&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&room_number=1&dest_type=city&adults_number=2&page_number=0&units=metric&checkout_date=2024-09-15&checkin_date=2024-09-14&locale=en-gb&children_ages=5%2C0&dest_id=${city}`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_BASE_URL
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch hotels: ${response.status} - ${await response.text()}`);
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
const express = require('express');
const { engine } =  require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

//Setup Handlebars Engine and Views
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/login', function(req, res) {
    res.render('login_register');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
