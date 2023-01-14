async function signupFormHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username').trim();
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    
    if (username && email && password) {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw Error(response.statusText);
            document.location.replace('/dashboard');
        } catch (err) {
            alert(err);
        }
    }
    }
    document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
   