const firebaseConfig = {
    apiKey: "AIzaSyA0ZMmsSH4s3TKrczev5Wf_fYcjNNO9VkQ",
    authDomain: "tele-med-sign-in.firebaseapp.com",
    databaseURL: "https://tele-med-sign-in-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tele-med-sign-in",
    storageBucket: "tele-med-sign-in.firebasestorage.app",
    messagingSenderId: "425762040195",
    appId: "1:425762040195:web:ca0c1fb1d5cbd32d772eb6"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.getElementById('newAppointmentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const doctor = document.getElementById('doctor').value;
    const dateTime = document.getElementById('dateTime').value;
    const email = document.getElementById('email').value;
    const speciality = document.getElementById('speciality').value;
    const reason = document.getElementById('reason').value;
    const communication = document.querySelector('input[name="communication"]:checked').value;

    const appointmentData = {
        name: name,
        phone: phone,
        doctor: doctor,
        dateTime: dateTime,
        email: email,
        speciality: speciality,
        reason: reason,
        communication: communication,
    };

    let isNewUser = true;

    let appointmentRef;

    if (isNewUser) {
        appointmentRef = database.ref('appointments/new');
    } else {
        appointmentRef = database.ref('appointments/existing');
    }

    let formattedPhone;

    appointmentRef.push(appointmentData)
        .then(() => {
            formattedPhone = phone.startsWith('+') ? phone : '+' + phone;

           fetch('https://tele-med-gilt.vercel.app/api/send-sms', {
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
        } else {
            console.log("SMS sent successfully");
        }
    })
    .catch(error => {
        console.error("SMS sending error:", error);
    });

            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('errorMessage').style.display = 'none';
            alert("Appointment booked successfully!");
            window.location.href = "payment.html";

        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('errorMessage').textContent = 'Error booking appointment: ' + error.message;
            document.getElementById('errorMessage').style.display = 'block';
            document.getElementById('successMessage').style.display = 'none';
        });
});

document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.getElementById('back-button');

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});
