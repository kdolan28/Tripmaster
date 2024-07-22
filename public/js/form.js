document.addEventListener('DOMContentLoaded', function() {
    // Toggle visibility function
    function toggleVisibility(elementId) {
        var form = document.getElementById(elementId);
        if (form.style.display === "none") {
            form.style.display = "block";
        } else {
            form.style.display = "none";
        }
    }

    // Event listener for the login link
    document.getElementById('loginLink').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        toggleVisibility('loginForm');
    });

    // Event listener for the register link
    document.getElementById('registerLink').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        toggleVisibility('registerForm');
    });
});