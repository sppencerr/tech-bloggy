const signUpHandler = async (event) => {
    event.preventDefault();

    const formData = {
        name: document.getElementById('signupname').value.trim(),
        email: document.getElementById('signupemail').value.trim(),
        password: document.getElementById('signuppw').value.trim()
    };

    if (formData.name && formData.email && formData.password) {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json'}
            });
            if (response.ok) {
                document.location.replace('/');
            } else {
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch(err) {
            console.error(err);
            // Add error handling for user here
        }
    } else {
        // Add error handling for missing fields here
    }
}

const signUpForm = document.getElementById('signupform');
signUpForm.addEventListener('submit', signUpHandler);

   