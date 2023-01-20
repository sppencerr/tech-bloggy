const loginFormHandler = async event => {
    event.preventDefault();
    
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modalText");
    const closeButton = document.querySelector(".close");
    
    if (email && password) {
    const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" }
    });
    
    if (response.ok) {
      document.location.replace("/");
    } else {
      modalText.textContent = "Wrong email or password, try again!";
      modal.style.display = "block";
      document.getElementById("login-email").value = "";
      document.getElementById("login-password").value = "";
    }
    } else {
    modalText.textContent = "Please enter a username and password";
    modal.style.display = "block";
    }
    
    closeButton.onclick = () => {
    modal.style.display = "none";
    };
    };
    
    const loginForm = document.querySelector(".login-form");
    loginForm.addEventListener("submit", loginFormHandler);