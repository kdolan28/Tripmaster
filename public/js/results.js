// Function to get search parameters from the URL and display results on the results page
async function getSearchParameters() {
    const params = new URLSearchParams(window.location.search);
    const destination = params.get('destination');
    const checkInDate = params.get('checkInDate');
    const checkOutDate = params.get('checkOutDate');
    const guests = params.get('guests');

    // Update UI with search details
    if (destination) {
        document.getElementById('destinationResults').innerHTML = `<p>Results for destination: ${destination}</p>`;
    }
    if (checkInDate && checkOutDate && guests) {
        document.getElementById('hotelResults').innerHTML = `<p>Hotels from ${checkInDate} to ${checkOutDate} for ${guests} guests</p>`;
    }

    // Fetch and display hotel information
    await fetchHotelData(destination, checkInDate, checkOutDate, guests);
}

// Fetch hotel data from the server
async function fetchHotelData(destination, checkInDate, checkOutDate, guests) {
    try {
        const response = await fetch(`/api/hotels?city=${destination}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${guests}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch hotel data: ${response.status} - ${await response.text()}`);
        }
        const data = await response.json();

        let resultsHTML = '';
        data.data.forEach(item => {
            resultsHTML += `<div class="result-item"><h4>${item.hotel.name}</h4><p>${item.offers[0].price.total} ${item.offers[0].price.currency}</p></div>`;
        });

        document.getElementById('hotelResults').innerHTML += resultsHTML;
    } catch (error) {
        console.error('Error fetching hotel data:', error);
        document.getElementById('hotelResults').innerHTML += '<p>Error fetching hotel data.</p>';
    }
}

// Event listener to call the getSearchParameters function when the results page loads
document.addEventListener('DOMContentLoaded', getSearchParameters);
