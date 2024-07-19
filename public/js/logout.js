const logout = async () => {
    const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
    document.location.replace('/');
    } else {
    alert("Oops, you didn't log out.");
    }
};

document.querySelector('#logout').addEventListener('click', logout);
