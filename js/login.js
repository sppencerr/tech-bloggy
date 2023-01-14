async function loginFormHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    
    if (email && password) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw Error(response.statusText);
            document.location.replace('/dashboard');
        } catch (err) {
            alert(err);
        }
    }
    }
    document.querySelector('.login-form').addEventListener('submit', loginFormHandler);