import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE_URL = 'booking-com.p.rapidapi.com';
const API_KEY = process.env.RAPIDAPI_KEY;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Setup Handlebars Engine and Views
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

// Endpoint to fetch destination ID by city name
app.get('/api/destination', async (req, res) => {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const url = `https://${API_BASE_URL}/v1/hotels/locations?name=${city}&locale=en-gb`;

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
            const errorText = await response.text();
            console.error(`Error fetching destination ID: ${response.status} - ${errorText}`);
            throw new Error(`Failed to fetch destination ID: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        if (data.length === 0) {
            return res.status(404).json({ error: 'No destination ID found for the provided city' });
        }

        const destinationId = data[0].dest_id;
        res.json({ destinationId });
    } catch (error) {
        console.error('Error fetching destination ID:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

// Endpoint to fetch hotels by city
app.get('/api/hotels', async (req, res) => {
    const { city, checkInDate, checkOutDate, guests } = req.query;
    if (!city || !checkInDate || !checkOutDate || !guests) {
        return res.status(400).json({ error: 'City, check-in date, check-out date, and guests parameters are required' });
    }

    try {
        // Fetch destination ID
        const destResponse = await fetch(`http://localhost:${PORT}/api/destination?city=${city}`);
        if (!destResponse.ok) {
            const errorText = await destResponse.text();
            console.error(`Error fetching destination ID: ${destResponse.status} - ${errorText}`);
            throw new Error(`Failed to fetch destination ID: ${destResponse.status} - ${errorText}`);
        }

        const destData = await destResponse.json();
        const destinationId = destData.destinationId;

        // Fetch hotels using destination ID
        const url = `https://${API_BASE_URL}/v1/hotels/search?locale=en-gb&filter_by_currency=AED&checkin_date=${checkInDate}&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&dest_type=city&dest_id=${destinationId}&adults_number=${guests}&checkout_date=${checkOutDate}&order_by=popularity&include_adjacency=true&room_number=1&page_number=0&units=metric`;

        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_BASE_URL
            }
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error fetching hotels: ${response.status} - ${errorText}`);
            throw new Error(`Failed to fetch hotels: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
