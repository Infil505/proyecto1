document.addEventListener("DOMContentLoaded", function () {
    const appointmentForm = document.getElementById("appointment-form");
    const maxAppointmentsPerDay = 8;

    function getAppointmentsForBarberOnDate(barber, date) {
        const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");

        if (!Array.isArray(storedAppointments)) {  
            localStorage.setItem("appointments", JSON.stringify([]));
            return [];
        }

        return storedAppointments.filter(appointment => (    //filter
            appointment.barber === barber && appointment.appointmentDate === date
        ));
    }

    function showAlert(message) {
        alert(message);
    }

    function addAppointmentToLocalStorage(appointment) {  
        const barberAppointments = getAppointmentsForBarberOnDate(appointment.barber, appointment.appointmentDate);

        if (barberAppointments.length >= 8) {
            showAlert('El barbero ya tiene el máximo de citas para este día. Por favor, elige otra fecha u otro barbero.');
        } else {
            const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
            storedAppointments.push(appointment);
            localStorage.setItem("appointments", JSON.stringify(storedAppointments));
            showAlert('Cita agendada con éxito. ¡Gracias!');
            window.location.href = "appointments.html";
        }
    }
    function isDateValid(selectedDate) {
        const currentDate = new Date();
        return selectedDate >= currentDate;
    }

    appointmentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const customerName = document.getElementById("customer-name").value;
        const barber = document.getElementById("barber").value;
        const haircut = document.getElementById("haircut").value;
        const appointmentDate = document.getElementById("appointment-date").value;
        const selectedDate = new Date(appointmentDate);

        if (!isDateValid(selectedDate)) {
            showAlert('No puedes agendar citas en fechas anteriores a la actual.');
        } else {
            const appointmentsForBarberAndDate = getAppointmentsForBarberOnDate(barber, appointmentDate);

            if (appointmentsForBarberAndDate.length >= maxAppointmentsPerDay) {
                showAlert('El barbero ya tiene el máximo de citas para este día. Por favor, elige otra fecha u otro barbero.');
            } else {
                const appointment = { customerName, barber, haircut, appointmentDate };
                addAppointmentToLocalStorage(appointment);
                appointmentForm.reset();
            }
        }
    });

    const barberContainer = document.getElementById("barber-container");
    const haircutContainer = document.getElementById("haircut-container");
    const barberSelect = createSelect("barber", "Selecciona un barbero", true, [
        "Luis Gonzales",
        "Daniel Mendez",
        "Maria Rodriguez",
        "Carlos Martinez",
        "Ana Lopez"
    ]);
    const haircutSelect = createSelect("haircut", "Selecciona un tipo de corte", true, [
        "Corte Pixie",
        "Corte Bob",
        "Corte Fade",
        "Corte Undercut",
        "Corte Mohawk",
        "Corte Shag",
        "Corte Taper",
        "Corte Long Bob",
        "Corte de Pelo Rizado",
        "Corte de Pelo Largo",
        "Corte de Pelo Corto"
    ]);
    barberContainer.appendChild(barberSelect);
    haircutContainer.appendChild(haircutSelect);

    const userDataString = localStorage.getItem("currentUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    const usersLink = document.getElementById("users-link");
    if (userData && userData.role === "empleado") {
        if (usersLink) {
            usersLink.style.display = "block";
        }
    }else{
        if (usersLink) {
            usersLink.style.display = "none";
        }
    }
});

function createSelect(id, title, required, optionsArray) {
    const select = document.createElement("select");
    select.classList.add("form-control");
    select.id = id;
    select.title = title;
    select.required = required;
    optionsArray.forEach(optionText => {
        const optionElement = document.createElement("option");
        optionElement.value = optionText;
        optionElement.textContent = optionText;
        select.appendChild(optionElement);
    });
    return select;
}
