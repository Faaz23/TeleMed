import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

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
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function () {
    const submit = document.getElementById('submit');
    const successMessage = document.getElementById('success-message');
    const signinSubmit = document.getElementById('signin-submit');
    const googleSignin = document.getElementById('googlesignin');
    const googleSigninLogin = document.getElementById('googlesignin-signin');
    const backButton = document.getElementById('back-button');

    if (submit) {
        submit.addEventListener("click", function (event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    localStorage.setItem('userEmail', user.email);

                    successMessage.style.display = 'block';

                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 2500);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert("Error: " + errorMessage);
                    console.error("Signup error:", errorCode, errorMessage);
                });
        });
    }

    if (signinSubmit) {
        signinSubmit.addEventListener("click", function (event) {
            event.preventDefault();
            const email = document.getElementById('email-signin').value;
            const password = document.getElementById('password-signin').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    localStorage.setItem('userEmail', user.email);
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert("Error: " + errorMessage);
                    console.error("Signin error:", errorCode, errorMessage);
                });
        });
    } else {
        console.error("signinSubmit element not found.");
    }

    if (googleSignin) {
        googleSignin.addEventListener("click", function () {
            const provider = new GoogleAuthProvider();

            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    localStorage.setItem('userEmail', user.email);

                    window.location.href = "index.html";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert("Google Sign-In Error: " + errorMessage);
                    console.error("Google Sign-In error:", errorCode, errorMessage);
                });
        });
    }

    if (googleSigninLogin) {
        googleSigninLogin.addEventListener("click", function () {
            const provider = new GoogleAuthProvider();

            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    localStorage.setItem('userEmail', user.email);

                    window.location.href = "index.html";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    if (errorCode === 'auth/cancelled-popup-request') {
                        console.log('Google Sign-In pop-up was closed by the user.');
                    } else {
                        alert("Google Sign-In Error: " + errorMessage);
                        console.error("Google Sign-In error:", errorCode, errorMessage);
                    }
                });
        });
    } else {
        console.error("googleSigninLogin element not found.");
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});
