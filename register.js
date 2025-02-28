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
submit.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('userEmail', user.email); // Store email
      alert("Creating Account...");
      console.log("User created:", user);
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error: " + errorMessage);
      console.error("Signup error:", errorCode, errorMessage);
    });
});

auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googlesignin = document.getElementById('googlesignin');
googlesignin.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Google Sign-In successful
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      localStorage.setItem('userEmail', user.email); // Store email
      alert("Google Sign-in successful!");
      console.log("Google Sign-in:", user);
      window.location.href = "index.html"; 
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      alert("Google Sign-in error: " + errorMessage);
      console.error("Google Sign-in error:", errorCode, errorMessage);
    });
});



document.addEventListener('DOMContentLoaded', function() {
  console.log("index.js loaded");
  const userEmail = localStorage.getItem('userEmail');
  if (userEmail) {
      console.log("User email from storage:", userEmail);
      const navbar = document.getElementById('navbar');
      console.log("Navbar element:", navbar);
      if (navbar) {
          const userDisplay = document.createElement('span');
          userDisplay.textContent = userEmail;
          userDisplay.style.color = "white";
          navbar.appendChild(userDisplay);
      }
  }
});

