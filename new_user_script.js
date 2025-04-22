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
    const appointmentRefPath = isNewUser ? 'appointments/new' : 'appointments/existing';
    const appointmentsRef = database.ref(appointmentRefPath);

    // Check if the selected time slot is already booked for the chosen doctor
    appointmentsRef
        .orderByChild('doctor')
        .equalTo(doctor)
        .once('value')
        .then(snapshot => {
            let isSlotBooked = false;
            snapshot.forEach(childSnapshot => {
                const existingAppointment = childSnapshot.val();
                if (existingAppointment.dateTime === dateTime) {
                    isSlotBooked = true;
                    return true; // Break out of the forEach loop
                }
            });

            if (isSlotBooked) {
                alert(`The selected date and time (${dateTime}) are already booked for Dr. ${doctor}. Please choose another time.`);
                return; // Prevent further booking
            }

            // If the slot is not booked, proceed with booking
            appointmentsRef.push(appointmentData)
                .then(() => {
                    console.log('Appointment data saved successfully!');
                    // ... (rest of your success handling code: SMS, success message, redirect) ...
                    let formattedPhone = phone;
                    if (!phone.startsWith('+')) {
                        formattedPhone = '+91' + phone;
                    }

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
                    console.error('Error saving appointment data:', error);
                    document.getElementById('errorMessage').textContent = 'Error booking appointment: ' + error.message;
                    document.getElementById('errorMessage').style.display = 'block';
                    document.getElementById('successMessage').style.display = 'none';
                });
        })
        .catch(error => {
            console.error('Error checking for existing appointments:', error);
            document.getElementById('errorMessage').textContent = 'Error checking availability. Please try again.';
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
