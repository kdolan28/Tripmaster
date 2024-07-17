// script.js

async function search() {
    const destination = document.getElementById('destinationInput').value;
    const checkInDate = document.getElementById('checkInDateInput').value;
    const checkOutDate = document.getElementById('checkOutDateInput').value;
    const guests = document.getElementById('guestsInput').value;

    // Example: Amadeus Flight Offers Search API endpoint
    const apiUrl = `/api/flights?destination=${destination}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${guests}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayFlightResults(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors
    }
}

function displayFlightResults(data) {
    const flightResultsDiv = document.getElementById('flightResults');
    flightResultsDiv.innerHTML = ''; // Clear previous results

    data.data.forEach(flight => {
        const flightElement = document.createElement('div');
        flightElement.classList.add('flight-item');
        flightElement.innerHTML = `
            <div><strong>Airline:</strong> ${flight.itineraries[0].segments[0].carrierCode}</div>
            <div><strong>Departure:</strong> ${flight.itineraries[0].segments[0].departure.at}</div>
            <div><strong>Arrival:</strong> ${flight.itineraries[0].segments[0].arrival.at}</div>
            <div><strong>Price:</strong> ${flight.offerItems[0].price.total} ${flight.offerItems[0].price.currency}</div>
        `;
        flightResultsDiv.appendChild(flightElement);
    });
}