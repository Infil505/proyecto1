document.addEventListener("DOMContentLoaded", function () {
    const appointmentForm = document.getElementById("appointment-form");

    appointmentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const customerName = document.getElementById("customer-name").value;
        const barber = document.getElementById("barber").value;
        const haircut = document.getElementById("haircut").value;
        const appointmentDate = document.getElementById("appointment-date").value;

        // Crear un objeto de cita
        const appointment = {
            customerName,
            barber,
            haircut,
            appointmentDate
        };

        // Obtener citas agendadas del localStorage o crear un array vacío si no existe
        const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

        // Agregar la nueva cita al array de citas
        storedAppointments.push(appointment);

        // Guardar las citas actualizadas en el localStorage
        localStorage.setItem("appointments", JSON.stringify(storedAppointments));

        // Limpiar el formulario
        appointmentForm.reset();

      
        alert('Cita agendada con éxito. ¡Gracias!');

        // Redireccionar a la página de "Mis Citas"
        window.location.href = "appointments.html";
    });
});

