document.addEventListener("DOMContentLoaded", function () {
    const usersTableBody = document.querySelector("#users-table tbody");
    const deleteButton = document.getElementById("delete-button");
    const roleFilter = document.getElementById("role-filter");
    const usersLink = document.getElementById("users-link"); 

    const userDataString = localStorage.getItem("currentUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    if (userData && userData.role === "empleado") {
        if (usersLink) {
            usersLink.style.display = "block";
        }
    }

    function loadUsers() {
        console.log("Cargando usuarios desde el localStorage...");
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        let filteredUsers = storedUsers; 

        if (roleFilter.value === "empleado") {
            filteredUsers = storedUsers.filter(user => user.userType === "empleado");     // uso del filter 
        } else if (roleFilter.value === "cliente") {
            filteredUsers = storedUsers.filter(user => user.userType === "usuario");
        }

        const maxUsersToShow = 5; 
        filteredUsers = filteredUsers.slice(0, maxUsersToShow);                        //slice  

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
        if (userData && userData.role === "empleado") {
            deleteButton.style.display = "block"; 
        } else {
            deleteButton.style.display = "none";
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



