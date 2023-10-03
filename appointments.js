document.addEventListener("DOMContentLoaded", function () {
    const appointmentsTableBody = document.querySelector("#appointments-table tbody");
    
    function loadAppointments() {
        console.log("Cargando citas desde el localStorage...");
        const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

        const rows = storedAppointments.map(appointment => {
            return `
                <tr>
                    <td>${appointment.customerName}</td>
                    <td>${appointment.barber}</td>
                    <td>${appointment.haircut}</td>
                    <td>${appointment.appointmentDate}</td>
                </tr>
            `;
        });

        appointmentsTableBody.innerHTML = rows.join("");

        console.log("Citas cargadas y mostradas en la tabla.");
    }

    loadAppointments();
});
