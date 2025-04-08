import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA0ZMmsSH4s3TKrczev5Wf_fYcjNNO9VkQ",
    authDomain: "tele-med-sign-in.firebaseapp.com",
    databaseURL: "https://tele-med-sign-in-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tele-med-sign-in",
    storageBucket: "tele-med-sign-in.firebasestorage.app",
    messagingSenderId: "425762040195",
    appId: "1:425762040195:web:ca0c1fb1d5cbd32d772eb6"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const appointmentsRef = ref(db, 'appointments/existing');

document.getElementById('existingAppointmentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = getElementVal('name');
    const phone = getElementVal('phone');
    const email = getElementVal('email');
    const speciality = getElementVal('speciality');
    const doctor = getElementVal('doctor');
    const reason = getElementVal('reason');
    const dateTime = getElementVal('dateTime');
    const communication = document.querySelector('input[name="communication"]:checked') ? document.querySelector('input[name="communication"]:checked').value : null;
    const consent = document.getElementById('consent').checked;

    if (!name || !phone || !email || !speciality || !doctor || !reason || !dateTime || !communication) {
        alert("Please fill in all the required fields.");
        return;
    }

    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Email:", email);
    console.log("Speciality:", speciality);
    console.log("Doctor:", doctor);
    console.log("Reason:", reason);
    console.log("Date and Time:", dateTime);
    console.log("Communication:", communication);
    console.log("Consent:", consent);

    const userEmail = localStorage.getItem('userEmail');

    push(appointmentsRef, {
        userEmail: userEmail,
        name: name,
        phone: phone,
        email: email,
        speciality: speciality,
        doctor: doctor,
        reason: reason,
        dateTime: dateTime,
        communication: communication,
        consent: consent,
    })
        .then(() => {
            const formattedPhone = phone.startsWith('+') ? phone : '+' + phone;

            fetch('http://localhost:5502/send-sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: formattedPhone,
                    body: `Your appointment with ${doctor} on ${dateTime} has been booked.`,
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        console.error("SMS sending failed:", response.status, response.statusText);
                    }
                })
                .catch(error => {
                    console.error("SMS sending error:", error);
                });

            alert('Appointment booked successfully!');
            window.location.href = "payment.html";
        })
        .catch((error) => {
            console.error("Error adding data: ", error);
            alert('Error booking appointment. Please try again.');
        });

    console.log(name, phone, email, speciality, doctor, reason, dateTime, communication, consent);
});

function getElementVal(id) {
    return document.getElementById(id).value;
}

document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.getElementById('back-button');

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});