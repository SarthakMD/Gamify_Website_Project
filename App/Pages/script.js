// auth.js - Firebase Authentication System
import { register, login, logout } from "./auth.js";

document.getElementById("register-btn")?.addEventListener("click", register);
document.getElementById("login-btn")?.addEventListener("click", login);
document.getElementById("logout-btn")?.addEventListener("click", logout);

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// 🔥 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAel5q84vsn2Dl_ckZxFYqWX_XrdMrrouA",
  authDomain: "gamify-4bd2f.firebaseapp.com",
  projectId: "gamify-4bd2f",
  storageBucket: "gamify-4bd2f.appspot.com",
  messagingSenderId: "845760233712",
  appId: "1:845760233712:web:0eb02cbbee4f6c1bef0235",
  measurementId: "G-CYS3HSQLZF",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🚀 **Register New User**
async function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const full_name = document.getElementById("full_name").value.trim();

  // Validate input fields
  if (!validateEmail(email) || !validatePassword(password)) {
    alert("Invalid Email or Password!");
    return;
  }
  if (!validateField(full_name)) {
    alert("Full name is required!");
    return;
  }

  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User registered:", user.uid);

    // Save user info to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      full_name: full_name,
      user_id: user.uid,
      created_at: serverTimestamp(),
    });

    alert("User registered successfully!");
    window.location.href = "index.html"; // Redirect to home page
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
}

// 🔑 **Login Existing User**
async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validate input fields
  if (!validateEmail(email) || !validatePassword(password)) {
    alert("Invalid login credentials!");
    return;
  }

  try {
    // Authenticate user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User logged in:", user.uid);

    // Update last login time
    await setDoc(
      doc(db, "users", user.uid),
      { last_login: serverTimestamp() },
      { merge: true }
    );

    alert("Login successful!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
}

// 🚪 **Logout Function**
async function logout() {
  try {
    await signOut(auth);
    alert("User logged out!");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
}

// ✅ **Validation Functions**
function validateEmail(email) {
  const expression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return expression.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateField(field) {
  return field && field.trim().length > 0;
}

// ✅ Export Functions for Use in Other Files
export { register, login, logout };

// ✅ Attach Event Listeners (Only After DOM is Loaded)
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("register-btn")) {
    document.getElementById("register-btn").addEventListener("click", register);
  }
  if (document.getElementById("login-btn")) {
    document.getElementById("login-btn").addEventListener("click", login);
  }
  if (document.getElementById("logout-btn")) {
    document.getElementById("logout-btn").addEventListener("click", logout);
  }
});
