document.addEventListener("DOMContentLoaded", function () {
    const usersTableBody = document.querySelector("#users-table tbody");
    const deleteButton = document.getElementById("delete-button");
    const roleFilter = document.getElementById("role-filter");
    const usersLink = document.getElementById("users-link"); // Elemento de enlace a la página de usuarios
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");
    const pageNumber = document.getElementById("page-number");

    // Obtener el objeto de usuario actual del almacenamiento local
    const userDataString = localStorage.getItem("currentUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    if (userData && userData.role === "empleado") {
        if (usersLink) {
            usersLink.style.display = "block";
        }
    }

    const itemsPerPage = 5; // Define cuántos usuarios mostrar por página
    let currentPage = 1;

    function loadUsers() {
        console.log("Cargando usuarios desde el localStorage...");
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        let filteredUsers = storedUsers; // Inicialmente, mostrar todos los usuarios

        if (roleFilter.value === "empleado") {
            filteredUsers = storedUsers.filter(user => user.userType === "empleado");
        } else if (roleFilter.value === "cliente") {
            filteredUsers = storedUsers.filter(user => user.userType === "usuario");
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const usersToDisplay = filteredUsers.slice(startIndex, endIndex);

        const rows = usersToDisplay.map((user, index) => {
            return `
                <tr data-index="${startIndex + index}">
                    <td>${user.username}</td>
                    <td>${user.userType}</td>
                    <td>${user.email}</td>
                    <td><input type="checkbox" class="select-user" ${userData && userData.role === "empleado" ? "" : "disabled"}></td>
                </tr>
            `;
        });

        usersTableBody.innerHTML = rows.join("");
        pageNumber.textContent = `Página ${currentPage}`;

        // Verificar si el usuario tiene el rol de "empleado" antes de mostrar u ocultar el botón de eliminar
        if (userData && userData.role === "empleado") {
            deleteButton.style.display = "block"; // Si es empleado, mostrar el botón
        } else {
            deleteButton.style.display = "none"; // Si no es empleado, ocultar el botón
        }

        // Habilitar o deshabilitar botones de paginación según la página actual
        if (currentPage === 1) {
            prevPageButton.disabled = true;
        } else {
            prevPageButton.disabled = false;
        }

        const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
        if (currentPage === totalPages) {
            nextPageButton.disabled = true;
        } else {
            nextPageButton.disabled = false;
        }
    }

    loadUsers();

    // Event listeners para navegación de páginas
    prevPageButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            loadUsers();
        }
    });

    nextPageButton.addEventListener("click", function () {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        let filteredUsers = storedUsers;

        if (roleFilter.value === "empleado") {
            filteredUsers = storedUsers.filter(user => user.userType === "empleado");
        } else if (roleFilter.value === "cliente") {
            filteredUsers = storedUsers.filter(user => user.userType === "usuario");
        }

        const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            loadUsers();
        }
    });

    roleFilter.addEventListener("change", function () {
        currentPage = 1; // Reiniciar a la primera página cuando cambie el filtro
        loadUsers();
    });

    // ...
});


