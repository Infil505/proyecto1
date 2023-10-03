const usersDB = JSON.parse(localStorage.getItem("users")) || [];

document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registration-form");
    const userTypeSelect = document.getElementById("user-type");
    const admin123Hex = "61646D696E313233"; 

    function hexToString(hex) {
        return hex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    }

    function showAlert(message) {
        alert(message);
    }

    function addUserToDB(username, password, email, userType) {
        usersDB.push({ username, password, email, userType });
        localStorage.setItem("users", JSON.stringify(usersDB));
    }

    registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("reg-username").value;
        const password = document.getElementById("reg-password").value;
        const email = document.getElementById("reg-email").value;
        const userType = userTypeSelect.value;
        const entered = userType === "empleado" ? prompt("Por favor, verifique su identidad de administrador con su clave de acceso al sistema") : "";

        if (usersDB.some(user => user.username === username)) {
            showAlert("El usuario ya existe. Por favor, elija otro nombre de usuario.");
        } else if (userType === "empleado" && entered !== hexToString(admin123Hex)) {
            showAlert('Contraseña de administrador incorrecta. El registro ha fallado.');
        } else {
            addUserToDB(username, userType === "empleado" ? hexToString(admin123Hex) : password, email, userType);
            showAlert(`Registro exitoso. Ahora puede iniciar sesión como ${userType === "empleado" ? "empleado" : "usuario"}.`);
            registrationForm.reset();
            window.location.href = "login.html";
        }
    });
});
