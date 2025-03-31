import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js"; // Import Firebase Config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Get UI elements
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const authContainer = document.getElementById("auth-container");
const userInfo = document.getElementById("user-info");
const userName = document.getElementById("user-name");
const errorMessage = document.getElementById("error-message");

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        userName.textContent = `Hello, ${user.displayName}`;
        authContainer.style.display = "none";
        userInfo.style.display = "block";
    } else {
        authContainer.style.display = "block";
        userInfo.style.display = "none";
    }
});

// Google Login
loginBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then(result => {
            const user = result.user;
            userName.textContent = `Hello, ${user.displayName}`;
            authContainer.style.display = "none";
            userInfo.style.display = "block";
        })
        .catch(error => {
            console.error("Login Error: ", error);
            errorMessage.textContent = error.message;
        });
});

// Logout
logoutBtn.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            authContainer.style.display = "block";
            userInfo.style.display = "none";
        })
        .catch(error => {
            console.error("Logout Error: ", error);
        });
});
