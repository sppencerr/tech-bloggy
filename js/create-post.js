async function newFormHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('post-title');
    const post_text = formData.get('post_text');
    
    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, post_text }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw Error(response.statusText);
        document.location.replace('/dashboard');
    } catch (err) {
        alert(err);
    }
    }
    document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);