// Firebase Config (Move this outside the form event listeners)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

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
const database = getDatabase(app);

// Function to populate the doctors dropdown (Move this outside)
function populateDoctors() {
    const specialitySelect = document.getElementById('speciality');
    const doctorSelect = document.getElementById('doctor');
    const selectedSpeciality = specialitySelect.value;

    // Clear existing options
    doctorSelect.innerHTML = '<option value="">Select Doctor</option>';

    // Define doctors for each speciality
    const doctors = {
        cardiology: ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams'],
        dermatology: ['Dr. Brown', 'Dr. Davis', 'Dr. Miller'],
        // Add more specialities and doctors as needed
    };

    // Populate doctors dropdown if a speciality is selected
    if (selectedSpeciality && doctors[selectedSpeciality]) {
        doctors[selectedSpeciality].forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor;
            option.textContent = doctor;
            doctorSelect.appendChild(option);
        });
    }
}

// Event listener for new user form
document.getElementById('new-user-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const userEmail = localStorage.getItem('userEmail');
    const name = document.getElementById('name').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const speciality = document.getElementById('speciality').value;
    const doctor = document.getElementById('doctor').value;
    const reason = document.getElementById('reason').value;
    const datetime = document.getElementById('datetime').value;
    const communication = document.querySelector('input[name="communication"]:checked').value;
    const consent = document.querySelector('input[name="consent"]').checked;

    push(ref(database, 'appointments'), {
        userEmail: userEmail,
        name: name,
        gender: gender,
        phone: phone,
        email: email,
        speciality: speciality,
        doctor: doctor,
        reason: reason,
        datetime: datetime,
        communication: communication,
        consent: consent,
    }).then(() => {
        alert("Appointment booked successfully.");
    }).catch((error) => {
        console.error("Error booking appointment: ", error);
        alert("Error booking appointment, please try again.");
    });
});

// Event listener for existing user form
document.getElementById('existing-user-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const userEmail = localStorage.getItem('userEmail');
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const speciality = document.getElementById('speciality').value;
    const doctor = document.getElementById('doctor').value;
    const reason = document.getElementById('reason').value;
    const datetime = document.getElementById('datetime').value;
    const communication = document.querySelector('input[name="communication"]:checked').value;
    const consent = document.querySelector('input[name="consent"]').checked;

    push(ref(database, 'appointments'), {
        userEmail: userEmail,
        name: name,
        phone: phone,
        email: email,
        speciality: speciality,
        doctor: doctor,
        reason: reason,
        datetime: datetime,
        communication: communication,
        consent: consent,
    }).then(() => {
        alert("Appointment booked successfully.");
    }).catch((error) => {
        console.error("Error booking appointment: ", error);
        alert("Error booking appointment, please try again.");
    });
});

// Call populateDoctors on speciality change
document.getElementById('speciality').addEventListener('change', populateDoctors);

// Initial population of doctors
populateDoctors();