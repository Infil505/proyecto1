document.addEventListener("DOMContentLoaded", function () {
    const appointmentForm = document.getElementById("appointment-form");

    appointmentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const customerName = document.getElementById("customer-name").value;
        const barber = document.getElementById("barber").value;
        const haircut = document.getElementById("haircut").value;
        const appointmentDate = document.getElementById("appointment-date").value;

        const appointment = {
            customerName,
            barber,
            haircut,
            appointmentDate
        };

        const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

        storedAppointments.push(appointment);

        localStorage.setItem("appointments", JSON.stringify(storedAppointments));

        appointmentForm.reset();

        alert('Cita agendada con éxito. ¡Gracias!');

        window.location.href = "appointments.html";
    });
});

const barberContainer = document.getElementById("barber-container");
const haircutContainer = document.getElementById("haircut-container");

const barberSelect = document.createElement("select");
barberSelect.classList.add("form-control");
barberSelect.id = "barber";
barberSelect.title = "Selecciona un barbero";
barberSelect.required = true;

const barberOptions = [
    "Luis Gonzales",
    "Daniel Mendez",
    "Maria Rodriguez",
    "Carlos Martinez",
    "Ana Lopez"
];
barberOptions.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    barberSelect.appendChild(optionElement);
});

const haircutSelect = document.createElement("select");
haircutSelect.classList.add("form-control");
haircutSelect.id = "haircut";
haircutSelect.title = "Selecciona un tipo de corte";
haircutSelect.required = true;

const haircutOptions = [
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
];
haircutOptions.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    haircutSelect.appendChild(optionElement);
});


barberContainer.appendChild(barberSelect);
haircutContainer.appendChild(haircutSelect);

