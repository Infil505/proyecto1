document.addEventListener("DOMContentLoaded", function () {
    const appointmentsTableBody = document.querySelector("#appointments-table tbody");
    const deleteButton = document.getElementById("delete-button");
    const usersLink = document.getElementById("users-link"); // Elemento de enlace a la página de usuarios
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");
    const pageNumber = document.getElementById("page-number");

    // Obtener el objeto de usuario actual del almacenamiento local
    const userDataString = localStorage.getItem("currentUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    // Verificar si el usuario tiene el rol de "empleado" para mostrar el enlace a la página de usuarios
    if (userData && userData.role === "empleado") {
        if (usersLink) {
            usersLink.style.display = "block";
        }
    }

    const itemsPerPage = 5; // Define cuántas citas mostrar por página
    let currentPage = 1;

    function loadAppointments() {
        console.log("Cargando citas desde el localStorage...");
        const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const appointmentsToDisplay = storedAppointments.slice(startIndex, endIndex);

        const rows = appointmentsToDisplay.map((appointment, index) => {
            return `
                <tr data-index="${startIndex + index}">
                    <td>${appointment.customerName}</td>
                    <td>${appointment.barber}</td>
                    <td>${appointment.haircut}</td>
                    <td>${appointment.appointmentDate}</td>
                    <td><input type="checkbox" class="select-appointment" ${userData && userData.role === "empleado" ? "" : "disabled"}></td>
                </tr>
            `;
        });

        appointmentsTableBody.innerHTML = rows.join("");
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

        const totalPages = Math.ceil(storedAppointments.length / itemsPerPage);
        if (currentPage === totalPages) {
            nextPageButton.disabled = true;
        } else {
            nextPageButton.disabled = false;
        }
    }

    loadAppointments();

    // Event listeners para navegación de páginas
    prevPageButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            loadAppointments();
        }
    });

    nextPageButton.addEventListener("click", function () {
        const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
        const totalPages = Math.ceil(storedAppointments.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            loadAppointments();
        }
    });

    // Resto del código para eliminar citas, igual que en el código de usuarios...
    appointmentsTableBody.addEventListener("change", function (e) {
        const checkboxes = document.querySelectorAll(".select-appointment");
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
        const checkboxes = document.querySelectorAll(".select-appointment");
        const selectedIndices = [];
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                selectedIndices.push(index);
            }
        });
        if (selectedIndices.length > 0) {
            const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
            selectedIndices.sort((a, b) => b - a);
            selectedIndices.forEach(index => {
                storedAppointments.splice(index, 1);
            });
            localStorage.setItem("appointments", JSON.stringify(storedAppointments));
            loadAppointments();
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            deleteButton.style.display = "none";
        }
    });
});
