const firebaseConfig = {
    apiKey: "AIzaSyA0ZMmsSH4s3TKrczev5Wf_fYcjNNO9VkQ",
    authDomain: "tele-med-sign-in.firebaseapp.com",
    databaseURL: "https://tele-med-sign-in-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tele-med-sign-in",
    storageBucket: "tele-med-sign-in.firebasestorage.app",
    messagingSenderId: "425762040195",
    appId: "1:425762040195:web:ca0c1fb1d5cbd32d772eb6"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

document.getElementById('newAppointmentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // This stops the page refresh

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
        timestamp: new Date().toISOString()
    };


    const appointmentRef = database.ref('appointments/new').push();
    appointmentRef.set(appointmentData)
        .then(() => {
            console.log("Data saved to Firebase");
            
            // Format phone for SMS
            let formattedPhone = phone;
            if (!phone.startsWith('+')) {
                formattedPhone = '+91' + phone;
            }

            return fetch('https://tele-med-gilt.vercel.app/api/send-sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: formattedPhone,
                    body: `Your appointment with ${doctor} on ${dateTime} has been booked.`,
                    // Removed process.env as it causes client-side errors
                }),
            });
        })
        .then(response => {
            if (!response.ok) {
                console.error("SMS notification failed, but appointment saved.");
            }
            
            // Show success UI
            document.getElementById('successMessage').style.display = 'block';
            if(document.getElementById('errorMessage')) {
                document.getElementById('errorMessage').style.display = 'none';
            }

            alert("Appointment booked successfully!");

            setTimeout(() => {
                window.location.href = "payment.html";
            }, 2000);
        })
        .catch(error => {
            console.error('Error:', error);
            const errorDiv = document.getElementById('errorMessage');
            if (errorDiv) {
                errorDiv.textContent = 'Error: ' + error.message;
                errorDiv.style.display = 'block';
            }
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