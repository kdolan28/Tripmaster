async function search() {
    const destination = document.getElementById('destinationInput').value;
    const checkInDate = document.getElementById('checkInDateInput').value;
    const checkOutDate = document.getElementById('checkOutDateInput').value;
    const guests = document.getElementById('guestsInput').value;

    // Validate input
    if (!destination || !checkInDate || !checkOutDate || !guests) {
        alert('Please fill in all fields');
        return;
    }

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

        document.getElementById('hotelResults').innerHTML = resultsHTML;
        document.getElementById('searchResults').style.display = 'block';
    } catch (error) {
        console.error('Error fetching hotel data:', error);
        document.getElementById('hotelResults').innerHTML = '<p>Error fetching hotel data.</p>';
    }
}

