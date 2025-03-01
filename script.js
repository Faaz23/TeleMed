const uploadBox = document.getElementById('upload-box');
const uploadFields = document.getElementById('upload-fields');

uploadBox.addEventListener('click', function (event) {
    uploadFields.style.display = 'flex';
    event.preventDefault();
});

let isVisible = false;

uploadBox.addEventListener('click', function (event) {
    event.preventDefault();

    isVisible = !isVisible;

    if (isVisible) {
        uploadFields.style.display = 'flex';
    } else {
        uploadFields.style.display = 'none';
    }
});


uploadBox.addEventListener('click', function (event) {
    event.preventDefault();

    if (uploadFields.style.display === 'none') {
        uploadFields.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        uploadFields.style.opacity = 0;
        uploadFields.style.transform = 'translateY(-20px)';

        uploadFields.style.display = 'flex';

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
});

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
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

document.getElementById('PatientVitals').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    const successMessage = document.getElementById('success-message');
    

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

    PatientVitalsDB.push({
        temperature: temperature,
        weight: weight,
        oxygen: oxygen,
        bloodPressure: bloodPressure
    })
    .then(() => {
        console.log('Data saved successfully!');

        successMessage.style.display = 'block';

        document.getElementById('body-temp').value = '';
        document.getElementById('weight').value = '';
        document.getElementById('oxygen').value = '';
        document.getElementById('blood-pressure').value = '';

        setTimeout(() => {
            successMessage.style.display = 'none';
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
