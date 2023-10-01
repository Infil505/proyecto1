
document.addEventListener("DOMContentLoaded", function () {

    const usersDB = JSON.parse(localStorage.getItem("users")) || []; // Obtener datos de usuarios desde el localStorage
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Verificar si el usuario existe en la "base de datos"
        const user = usersDB.find(user => user.username === username);

        if (user && user.password === password) {
            alert("Inicio de sesión exitoso.");
            loginForm.reset();

            // Redireccionar al usuario a la página de agendar citas después del inicio de sesión
            window.location.href = "appointment.html";
        } else {
            alert("Credenciales incorrectas. Intente nuevamente.");
        }
    });
});
/*CAMBIO DEL CAMBIO */
