document.addEventListener("DOMContentLoaded", function () {
    const usersDB = JSON.parse(localStorage.getItem("users")) || [];
    const loginForm = document.getElementById("login-form");
    const navButtons = document.querySelectorAll("nav ul li:not(:nth-child(2))");
    navButtons.forEach(button => {
        button.style.display = "none";
    });

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const user = usersDB.find(user => user.username === username);

        if (user) {
            if (user.password === password) {
                console.log("Inicio de sesión exitoso.");
                loginForm.reset();
                navButtons.forEach(button => {
                    button.style.display = "inline-block";
                });
                document.querySelector("nav ul li:nth-child(2)").style.display = "none";
                window.location.href = "index.html";
            } else {
                console.log("Contraseña incorrecta. Intente nuevamente.");
            }
        } else {
            console.log("El usuario no existe. Regístrese primero.");
        }
    });

    const restrictedPages = ["page1.html", "page2.html"];
    const currentPage = window.location.href.split("/").slice(-1)[0];
    if (restrictedPages.includes(currentPage)) {
        const username = prompt("Por favor, ingrese su nombre de usuario:");
        const user = usersDB.find(user => user.username === username);

        if (!user) {
            console.log("Usuario no encontrado. Acceso no autorizado a esta página.");
            window.location.href = "index.html";
        }
    }
});


