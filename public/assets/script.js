// Function to handle the search
function search() {
    const destination = document.getElementById('destinationInput').value;
    const checkInDate = document.getElementById('checkInDateInput').value;
    const checkOutDate = document.getElementById('checkOutDateInput').value;
    const guests = document.getElementById('guestsInput').value;

    // Construct the URL parameters
    const params = new URLSearchParams({
        destination: destination,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guests
    });

    // Redirect to results page with encoded parameters
    window.location.href = '/search-results?' + params.toString();
}



document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-bar button');
    if (searchButton) {
        searchButton.addEventListener('click', search);
    }
});
