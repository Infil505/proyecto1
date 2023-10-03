document.addEventListener("DOMContentLoaded", function () {
    const appointmentsTableBody = document.querySelector("#appointments-table tbody");
    const deleteButton = document.getElementById("delete-button");

    // Obtener el objeto de usuario actual del almacenamiento local
    const userDataString = localStorage.getItem("currentUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    function loadAppointments() {
        console.log("Cargando citas desde el localStorage...");
        const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
        const rows = storedAppointments.map((appointment, index) => {
            return `
                <tr data-index="${index}">
                    <td>${appointment.customerName}</td>
                    <td>${appointment.barber}</td>
                    <td>${appointment.haircut}</td>
                    <td>${appointment.appointmentDate}</td>
                    <td><input type="checkbox" class="select-appointment" ${userData && userData.role === "empleado" ? "" : "disabled"}></td>
                </tr>
            `;
        });
        appointmentsTableBody.innerHTML = rows.join("");
        console.log("Citas cargadas y mostradas en la tabla.");

        // Verificar si el usuario tiene el rol de "empleado" antes de mostrar u ocultar el botón de eliminar
        if (userData && userData.role === "empleado") {
            deleteButton.style.display = "block"; // Si es empleado, mostrar el botón
        } else {
            deleteButton.style.display = "none"; // Si no es empleado, ocultar el botón
        }
    }

    loadAppointments();

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
