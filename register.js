const usersDB = JSON.parse(localStorage.getItem("users")) || [];

document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registration-form");

    registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("reg-username").value;
        const password = document.getElementById("reg-password").value;
        const email = document.getElementById("reg-email").value;

        // Verificar si el usuario ya existe
        if (usersDB.some(user => user.username === username)) {
            alert("El usuario ya existe. Por favor, elija otro nombre de usuario.");
        } else {
            // Agregar usuario a la "base de datos"
            usersDB.push({ username, password, email });
            localStorage.setItem("users", JSON.stringify(usersDB));
            alert("Registro exitoso. Ahora puede iniciar sesión.");
            registrationForm.reset();

            window.location.href = "login.html";

        }
    });
});
