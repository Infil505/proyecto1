document.addEventListener("DOMContentLoaded", function () {
    const appointmentsTableBody = document.querySelector("#appointments-table tbody");
    function loadAppointments() {
        console.log("Cargando citas desde el localStorage...");
        const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
                appointmentsTableBody.innerHTML = "";
        storedAppointments.forEach(appointment => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${appointment.customerName}</td>
                <td>${appointment.barber}</td>
                <td>${appointment.haircut}</td>
                <td>${appointment.appointmentDate}</td>
            `;
            appointmentsTableBody.appendChild(row);
            console.log("Nombre del Cliente:", appointment.customerName);
            console.log("Barbero:", appointment.barber);
            console.log("Tipo de Corte:", appointment.haircut);
            console.log("Fecha de la Cita:", appointment.appointmentDate);
        });
        console.log("Citas cargadas y mostradas en la tabla.");
    }

    loadAppointments();
});