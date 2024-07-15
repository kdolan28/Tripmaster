const https = require('https');
require('dotenv').config(); // For loading environment variables from a .env file

// Fetch hotels function
function fetchHotels(city) {
    const API_KEY = process.env.PRICE_API_KEY; // Load API key from environment variables
    const options = {
        method: 'GET',
        hostname: 'priceline-com.p.rapidapi.com',
        path: `/hotels/city/search?q=${encodeURIComponent(city)}`,
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'priceline-com.p.rapidapi.com'
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            // A chunk of data has been received
            res.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        });

        // Handle request errors
        req.on('error', (error) => {
            reject(error);
        });

        // End the request
        req.end();
    });
}

// Example usage
const city = 'Seattle';
fetchHotels(city)
    .then((data) => {
        console.log('Hotel data for', city, ':', data);
    })
    .catch((error) => {
        console.error('Error fetching hotel data:', error);
    });
