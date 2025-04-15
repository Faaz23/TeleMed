const uploadBox = document.getElementById('upload-box');
const uploadFields = document.getElementById('upload-fields');
const navbarUploadLink = document.getElementById('navbar-upload-link');
const callDoctorsBox = document.getElementById('call-doctors-box');

let isVisible = false;
let isBookAppointmentVisible = false;

function checkLoginAndRedirect(event, redirectUrl) {
    event.preventDefault();
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        alert("Please sign in to proceed.");
        return;
    }
    window.location.href = redirectUrl;
}

function toggleUploadFields(event) {
    event.preventDefault();

    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        alert("Please sign in to proceed.");
        return;
    }

    isVisible = !isVisible;

    if (isVisible) {
        uploadFields.style.display = 'flex';
        uploadFields.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        uploadFields.style.opacity = 0;
        uploadFields.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            uploadFields.style.opacity = 1;
            uploadFields.style.transform = 'translateY(0)';
        }, 10);
    } else {
        uploadFields.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        uploadFields.style.opacity = 1;
        uploadFields.style.transform = 'translateY(0)';

        setTimeout(() => {
            uploadFields.style.opacity = 0;
            uploadFields.style.transform = 'translateY(-20px)';
        }, 10);

        setTimeout(() => {
            uploadFields.style.display = 'none';
        }, 500);
    }
}

function checkLoginAndToggleAppointment(event) {
    event.preventDefault();
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        alert("Please sign in to proceed.");
        return;
    }
    toggleBookAppointmentFields();
}

function toggleBookAppointmentFields(event) {
    if (event) {
        event.preventDefault();
    }

    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        alert("Please sign in to proceed.");
        return;
    }

    isBookAppointmentVisible = !isBookAppointmentVisible;
    const bookAppointmentFields = document.getElementById('book-appointment-fields');

    if (isBookAppointmentVisible) {
        bookAppointmentFields.style.display = 'block';
        bookAppointmentFields.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        bookAppointmentFields.style.opacity = 0;
        bookAppointmentFields.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            bookAppointmentFields.style.opacity = 1;
            bookAppointmentFields.style.transform = 'translateY(0)';
        }, 10);
    } else {
        bookAppointmentFields.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        bookAppointmentFields.style.opacity = 1;
        bookAppointmentFields.style.transform = 'translateY(0)';

        setTimeout(() => {
            bookAppointmentFields.style.opacity = 0;
            bookAppointmentFields.style.transform = 'translateY(-20px)';
        }, 10);

        setTimeout(() => {
            bookAppointmentFields.style.display = 'none';
        }, 500);
    }
}

function navigateToNewUser() {
    window.location.href = "new_user_appointment.html";
}

function navigateToExistingUser() {
    window.location.href = "existing_user_appointment.html";
}

function calldoctor() {
    alert('calldoctor() function called');
}

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

var PatientVitalsDB = firebase.database().ref('PatientVitals');

function submitForm(e) {
    e.preventDefault();

    const successMessage = document.getElementById('success-message');
    const uploadFields = document.getElementById('upload-fields');
    const fieldContainers = document.querySelectorAll('.field-container');
    const submitButton = document.querySelector('#upload-fields button[type="submit"]');

    var temperature = getElementVal('body-temp');
    var weight = getElementVal('weight');
    var oxygen = getElementVal('oxygen');
    var bloodPressure = getElementVal('blood-pressure');

    if (!temperature || !weight || !oxygen || !bloodPressure) {
        alert("Please fill in all the fields.");
        return;
    }

    console.log("Temperature:", temperature);
    console.log("Weight:", weight);
    console.log("Oxygen:", oxygen);
    console.log("Blood Pressure:", bloodPressure);

    var userEmail = localStorage.getItem('userEmail');

    PatientVitalsDB.push({
        userEmail: userEmail,
        temperature: temperature,
        weight: weight,
        oxygen: oxygen,
        bloodPressure: bloodPressure,
    })
        .then(() => {
            console.log('Data saved successfully!');

            fieldContainers.forEach(container => {
                container.style.display = 'none';
            });
            submitButton.style.display = 'none';

            successMessage.style.display = 'block';
            successMessage.style.textAlign = 'center';

            setTimeout(() => {
                document.getElementById('body-temp').value = '';
                document.getElementById('weight').value = '';
                document.getElementById('oxygen').value = '';
                document.getElementById('blood-pressure').value = '';

                successMessage.style.display = 'none';
                fieldContainers.forEach(container => {
                    container.style.display = 'flex';
                });
                submitButton.style.display = 'inline-block';
            }, 3000);
        })
        .catch((error) => {
            console.error('Error saving data:', error);
        });

    console.log(temperature, weight, oxygen, bloodPressure);
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.addEventListener('DOMContentLoaded', function () {
    const homeLink = document.getElementById('h');
    const bookAppointmentLink = document.getElementById('b');
    const symptomAnalysisLink = document.getElementById('s');
    const bookAppointmentBox = document.getElementById('book-appointment-box');
    const bookAppointmentNavbarLink = document.getElementById('b');
    const userEmail = localStorage.getItem('userEmail');
    const userEmailDisplay = document.getElementById('user-email-display');
    const userLogo = document.querySelector('#userlogo').parentElement;
    const navbar = document.getElementById('navbar');
    const dropdown = document.createElement('div');
    dropdown.id = 'user-dropdown';
    const emailParagraph = document.createElement('p');
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';

    dropdown.appendChild(emailParagraph);
    dropdown.appendChild(logoutButton);
    document.body.appendChild(dropdown);

    if (bookAppointmentBox) {
        bookAppointmentBox.addEventListener('click', toggleBookAppointmentFields);
    }

    if (bookAppointmentNavbarLink) {
        bookAppointmentNavbarLink.addEventListener('click', checkLoginAndToggleAppointment);
    }

    homeLink.addEventListener('click', (event) => {
        checkLoginAndRedirect(event, "#Home");
    });

    bookAppointmentLink.addEventListener('click', (event) => {
        checkLoginAndRedirect(event, "#Book Appointment");
    });

    symptomAnalysisLink.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = "symptom_analysis.html";
    });

    if (userEmail) {
        const username = userEmail.split('@')[0];
        const firstLetter = username.charAt(0).toUpperCase();

        userEmailDisplay.textContent = firstLetter;
        userEmailDisplay.style.color = 'white';
        userEmailDisplay.style.backgroundColor = getRandomColor();
        userEmailDisplay.style.borderRadius = '50%';
        userEmailDisplay.style.width = '30px';
        userEmailDisplay.style.height = '30px';
        userEmailDisplay.style.display = 'flex';
        userEmailDisplay.style.justifyContent = 'center';
        userEmailDisplay.style.alignItems = 'center';
        userEmailDisplay.style.marginLeft = '10px';
        userLogo.style.display = 'none';

        userEmailDisplay.addEventListener('click', () => {
            emailParagraph.textContent = userEmail;
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', (event) => {
            const isClickInsideDropdown = dropdown.contains(event.target);
            const isClickOnUserLogo = userEmailDisplay.contains(event.target);

            if (!isClickInsideDropdown && !isClickOnUserLogo) {
                dropdown.style.display = 'none';
            }
        });

        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('userEmail');
            window.location.reload();
        });
    } else {
        userEmailDisplay.textContent = '';
        userLogo.style.display = 'inline-block';
    }

    document.getElementById('PatientVitals').addEventListener('submit', submitForm);
    uploadBox.addEventListener('click', toggleUploadFields);
    navbarUploadLink.addEventListener('click', toggleUploadFields);

    const callDoctorsDropdown = document.getElementById('call-doctors-dropdown');

    callDoctorsBox.addEventListener('click', () => {
        callDoctorsDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
        if (!callDoctorsBox.contains(event.target) && !callDoctorsDropdown.contains(event.target)) {
            callDoctorsDropdown.classList.remove('show');
        }
    });

});
