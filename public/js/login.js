const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    try{
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

      if (!response.ok) {}
      switch (response.status) {
        case 400:
        case 401:
          alert('Invalid email or password');
          break;
          case 404:
            alert('User not found. Please sign up.');
        default:
          alert('Failed to log in');
          break;
      }
      
      if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    }
    }
   catch (error) {
    console.error('Error logging in:', error);
    alert('Error logging in');
  
  }

  } else {
    alert('Please enter email and password');
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

const signup = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('.register-form')
  .addEventListener('submit', signupFormHandler);
