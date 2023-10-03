const usersDB = JSON.parse(localStorage.getItem("users")) || [];

function binaryToString(binary) {
    const binaryArray = binary.split(" ");
    let result = "";

    for (let i = 0; i < binaryArray.length; i++) {
    const binaryChar = binaryArray[i];
    const decimalValue = parseInt(binaryChar, 2);
    const charValue = String.fromCharCode(decimalValue);
    result += charValue;
    }

    return result;
}
document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registration-form");
    const userTypeSelect = document.getElementById("user-type");
    const reversedBinary = "11010010 11000110 00110010 00110000 11000110 11000110 11000110 11000011".split(" ").join("");

    registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;
    const email = document.getElementById("reg-email").value;
    const entered = prompt("Por favor, Verifique su identidad de administrador con su clave");
    const userType = userTypeSelect.value;

    if (usersDB.some(user => user.username === username)) {
        alert("El usuario ya existe. Por favor, elija otro nombre de usuario.");
    } else {
        if (userType === "empleado") {
        if (binaryToString(entered) === binaryToString(reversedBinary)) {
            usersDB.push({ username, password: entered, email, userType: "empleado" });
            localStorage.setItem("users", JSON.stringify(usersDB));
            alert("Registro exitoso. Ahora puede iniciar sesión como empleado.");
            registrationForm.reset();
        } else {
            alert('Contraseña de administrador incorrecta. El registro ha fallado.');
        }
    } else {
        usersDB.push({ username, password, email, userType: "usuario" });
        localStorage.setItem("users", JSON.stringify(usersDB));
        alert("Registro exitoso. Ahora puede iniciar sesión como usuario.");
        registrationForm.reset();
    }
    window.location.href = "login.html";
    }
  });
});


