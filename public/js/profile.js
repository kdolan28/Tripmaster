// Function to handle the search
async function search() {
    const destination = document.getElementById('destinationInput').value;
    const checkInDate = document.getElementById('checkInDateInput').value;
    const checkOutDate = document.getElementById('checkOutDateInput').value;
    const guests = document.getElementById('guestsInput').value;

    // Construct the URL parameters
    const params = new URLSearchParams({
        destination: destination,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        guests: guests
    });

    // Redirect to results.html with encoded parameters
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
}};
