document.addEventListener("DOMContentLoaded", function () {

    const usersDB = JSON.parse(localStorage.getItem("users")) || [];
    const loginForm = document.getElementById("login-form");

    // Ocultar los botones de la barra de navegación, excepto el de Iniciar Sesión
    const navButtons = document.querySelectorAll("nav ul li:not(:nth-child(2))");
    navButtons.forEach(button => {
        button.style.display = "none";
    });

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const user = usersDB.find(user => user.username === username);

        if (user && user.password === password) {
            alert("Inicio de sesión exitoso.");
            loginForm.reset();

            // Mostrar los botones de la barra de navegación y ocultar el botón de Iniciar Sesión
            navButtons.forEach(button => {
                button.style.display = "inline-block";
            });
            document.querySelector("nav ul li:nth-child(2)").style.display = "none";
            window.location.href = "index.html";
        } else {
            alert("Credenciales incorrectas. Intente nuevamente.");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const restrictedPages = ["page1.html", "page2.html"]; // Lista de páginas restringidas

    // Verificar si la página actual está en la lista de páginas restringidas
    const currentPage = window.location.href.split("/").slice(-1)[0]; // Obtener el nombre de la página actual
    if (restrictedPages.includes(currentPage)) {
        alert("Acceso no autorizado a esta página.");
        window.location.href = "index.html"; // Redirigir a la página de inicio o a otra página autorizada
    }
});

