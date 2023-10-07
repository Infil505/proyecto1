document.addEventListener("DOMContentLoaded", function () {
    const usersTableBody = document.querySelector("#users-table tbody");
    const deleteButton = document.getElementById("delete-button");
    const roleFilter = document.getElementById("role-filter");
    const usersLink = document.getElementById("users-link"); // Elemento de enlace a la página de usuarios

    // Obtener el objeto de usuario actual del almacenamiento local
    const userDataString = localStorage.getItem("currentUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    // Verificar si el usuario tiene el rol de "empleado" para mostrar el enlace a la página de usuarios
    if (userData && userData.role === "empleado") {
        if (usersLink) {
            usersLink.style.display = "block";
        }
    }

    function loadUsers() {
        console.log("Cargando usuarios desde el localStorage...");
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        let filteredUsers = storedUsers; // Inicialmente, mostrar todos los usuarios

        if (roleFilter.value === "empleado") {
            filteredUsers = storedUsers.filter(user => user.userType === "empleado");
        } else if (roleFilter.value === "cliente") {
            filteredUsers = storedUsers.filter(user => user.userType === "usuario");
        }

        // Limitar la cantidad de usuarios mostrados
        const maxUsersToShow = 10; // Cambia esto al número deseado
        filteredUsers = filteredUsers.slice(0, maxUsersToShow);

        const rows = filteredUsers.map((user, index) => {
            return `
                <tr data-index="${index}">
                    <td>${user.username}</td>
                    <td>${user.userType}</td>
                    <td>${user.email}</td>
                    <td><input type="checkbox" class="select-user" ${userData && userData.role === "empleado" ? "" : "disabled"}></td>
                </tr>
            `;
        });

        usersTableBody.innerHTML = rows.join("");
        console.log("Usuarios cargados y mostrados en la tabla.");
        // Verificar si el usuario tiene el rol de "empleado" antes de mostrar u ocultar el botón de eliminar
        if (userData && userData.role === "empleado") {
            deleteButton.style.display = "block"; // Si es empleado, mostrar el botón
        } else {
            deleteButton.style.display = "none"; // Si no es empleado, ocultar el botón
        }
    }

    loadUsers();

    roleFilter.addEventListener("change", function () {
        loadUsers();
    });

    usersTableBody.addEventListener("change", function (e) {
        const checkboxes = document.querySelectorAll(".select-user");
        const selectedIndices = [];
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                selectedIndices.push(index);
            }
        });
        if (selectedIndices.length > 0 && userData && userData.role === "empleado") {
            deleteButton.style.display = "block";
        } else {
            deleteButton.style.display = "none";
        }
    });

    deleteButton.addEventListener("click", function () {
        const checkboxes = document.querySelectorAll(".select-user");
        const selectedIndices = [];
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                selectedIndices.push(index);
            }
        });
        if (selectedIndices.length > 0) {
            const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
            selectedIndices.sort((a, b) => b - a);
            selectedIndices.forEach(index => {
                storedUsers.splice(index, 1);
            });
            localStorage.setItem("users", JSON.stringify(storedUsers));
            loadUsers();
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            deleteButton.style.display = "none";
        }
    });
});



