document.addEventListener("DOMContentLoaded", function () {
    const appointmentsTableBody = document.querySelector("#appointments-table tbody");

    // Función para cargar y mostrar las citas agendadas desde el localStorage
    function loadAppointments() {
        // Obtener las citas agendadas desde el localStorage
        const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

        // Limpiar el cuerpo de la tabla antes de mostrar los nuevos datos
        appointmentsTableBody.innerHTML = "";

        // Mostrar las citas agendadas en la tabla
        storedAppointments.forEach(appointment => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${appointment.customerName}</td>
                <td>${appointment.barber}</td>
                <td>${appointment.haircut}</td>
                <td>${appointment.appointmentDate}</td>
            `;
            appointmentsTableBody.appendChild(row);
        });
    }

    // Cargar y mostrar las citas agendadas al cargar la página
    loadAppointments();
});