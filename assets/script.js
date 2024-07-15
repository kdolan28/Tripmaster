// Function to handle the search action on the main page
function search() {
    const destination = document.getElementById('destinationInput').value;
    const checkInDate = document.getElementById('checkInDateInput').value;
    const checkOutDate = document.getElementById('checkOutDateInput').value;
    const guests = document.getElementById('guestsInput').value;

    const params = new URLSearchParams({
        destination: destination,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guests
    });

    window.location.href = 'results.html?' + params.toString();
}

// Function to get search parameters from the URL and display results on the results page
async function getSearchParameters() {
    const params = new URLSearchParams(window.location.search);
    const destination = params.get('destination');
    const checkInDate = params.get('checkIn');
    const checkOutDate = params.get('checkOut');
    const guests = params.get('guests');

    document.getElementById('destinationResults').innerHTML = `<p>Results for destination: ${destination}</p>`;
    document.getElementById('hotelResults').innerHTML = `<p>Hotels from ${checkInDate} to ${checkOutDate} for ${guests} guests</p>`;
    document.getElementById('flightResults').innerHTML = `<p>Flights to ${destination}</p>`;

    // Fetch and display destination information
    await fetchDestinationData(destination);

    // Fetch and display hotel information
    await fetchHotelData(destination, checkInDate, checkOutDate, guests);

    // Fetch and display flight information
    await fetchFlightData(destination);
}

// Fetch destination data from the server
async function fetchDestinationData(destination) {
    try {
        const response = await fetch(`/api/destination?location=${destination}`);
        const data = await response.json();

        let resultsHTML = '';
        data.data.forEach(item => {
            resultsHTML += `<div class="result-item"><h4>${item.name}</h4><p>${item.description}</p></div>`;
        });

        document.getElementById('destinationResults').innerHTML += resultsHTML;
    } catch (error) {
        console.error('Error fetching destination data:', error);
        document.getElementById('destinationResults').innerHTML += '<p>Error fetching destination data.</p>';
    }
}

// Fetch hotel data from the server
async function fetchHotelData(destination, checkInDate, checkOutDate, guests) {
    try {
        const response = await fetch(`/api/hotels?cityCode=${destination}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=${guests}`);
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

// Fetch flight data from the server
async function fetchFlightData(destination) {
    try {
        const response = await fetch(`/api/flights?origin=SYD&destination=${destination}`);
        const data = await response.json();

        let resultsHTML = '';
        data.data.forEach(item => {
            resultsHTML += `<div class="result-item"><h4>${item.itineraries[0].segments[0].carrierCode}</h4><p>${item.price.total} ${item.price.currency}</p></div>`;
        });

        document.getElementById('flightResults').innerHTML += resultsHTML;
    } catch (error) {
        console.error('Error fetching flight data:', error);
        document.getElementById('flightResults').innerHTML += '<p>Error fetching flight data.</p>';
    }
}

// Event listener to call the getSearchParameters function when the results page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('destinationResults')) {
        getSearchParameters();
    }
});



