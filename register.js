import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

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

const submit = document.getElementById('submit');
const successMessage = document.getElementById('success-message'); 

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

//peace
