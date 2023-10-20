document.addEventListener("DOMContentLoaded", function () {
    const usersDB = JSON.parse(localStorage.getItem("users")) || [];
    const loginForm = document.getElementById("login-form");
    const navButtons = document.querySelectorAll("nav ul li:not(:nth-child(2))");
    const errorMessage = document.getElementById("error-message");

    navButtons.forEach(button => {
        button.style.display = "none";
    });

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const user = usersDB.find(user => user.username === username);                    // uso del find 
        if (user) {
            if (user.password === password) {        
                console.log("Inicio de sesión exitoso.");
                loginForm.reset();
                navButtons.forEach(button => {
                    button.style.display = "inline-block";
                });
                document.querySelector("nav ul li:nth-child(2)").style.display = "none";
                const userData = {
                    username: username,
                    role: user.userType 
                };
                localStorage.setItem("currentUser", JSON.stringify(userData));   
                window.location.href = "index.html";
            } else {
                errorMessage.textContent = "Contraseña incorrecta. Intente nuevamente."; 
            }
        } else {
            errorMessage.textContent = "El usuario no existe. Regístrese primero."; 
        }
    });

    const usersLink = document.getElementById("users-link");
    const userDataString = localStorage.getItem("currentUser");
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData.role === "empleado") {
            if (usersLink) {
                usersLink.style.display = "block";
            }
        }
    }
});
