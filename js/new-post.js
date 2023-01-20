const newPostForm = document.getElementById('post-form');

const submitNewPost = async (event) => {
  event.preventDefault();

  const postTitle = document.getElementById('post-title').value.trim();
  const postText = document.getElementById('post-text').value.trim();

  try {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ postTitle, postText }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      throw new Error('Unable to create post');
    }
  } catch (error) {
    console.error(error);
  }
};

newPostForm.addEventListener('submit', submitNewPost);
