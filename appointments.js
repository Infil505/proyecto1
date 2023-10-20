document.addEventListener("DOMContentLoaded", function () {
    const appointmentsTableBody = document.querySelector("#appointments-table tbody");
    const deleteButton = document.getElementById("delete-button");
    const usersLink = document.getElementById("users-link");
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
} else {
    // Si el usuario no es "empleado", ocultar el enlace a la página de usuarios
    if (usersLink) {
        usersLink.style.display = "none";
    }
}


    const itemsPerPage = 5; // Define cuántas citas mostrar por página
    let currentPage = 1;
    let futureAppointments = []; // Array para almacenar citas futuras

    function loadAppointments() {
        console.log("Cargando citas desde el localStorage...");
        const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

        // Filtrar citas futuras
        const currentDate = new Date();
        futureAppointments = storedAppointments.filter(appointment => {
            const appointmentDate = new Date(appointment.appointmentDate);
            return appointmentDate >= currentDate;
        });

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const appointmentsToDisplay = futureAppointments.slice(startIndex, endIndex);

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

        if (userData && userData.role === "empleado") {
            deleteButton.style.display = "block"; 
        } else {
            deleteButton.style.display = "none"; 
        }

        if (currentPage === 1) {
            prevPageButton.disabled = true;
        } else {
            prevPageButton.disabled = false;
        }

        const totalPages = Math.ceil(futureAppointments.length / itemsPerPage);  
        if (currentPage === totalPages) {
            nextPageButton.disabled = true;
        } else {
            nextPageButton.disabled = false;
        }
    }

    loadAppointments();

    prevPageButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            loadAppointments();
        }
    });

    nextPageButton.addEventListener("click", function () {
        const totalPages = Math.ceil(futureAppointments.length / itemsPerPage);          
        if (currentPage < totalPages) {
            currentPage++;
            loadAppointments();
        }
    });

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
            selectedIndices.forEach(index => {
                const startIndex = (currentPage - 1) * itemsPerPage;
                const futureIndex = startIndex + index;
                futureAppointments.splice(futureIndex, 1);
            });
            localStorage.setItem("appointments", JSON.stringify(futureAppointments));
            loadAppointments();
        }
    });
});
