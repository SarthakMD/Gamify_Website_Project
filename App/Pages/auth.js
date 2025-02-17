// ✅ Import Firebase modules
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
import {
  getDatabase,
  ref,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAel5q84vsn2Dl_ckZxFYqWX_XrdMrrouA",
  authDomain: "gamify-4bd2f.firebaseapp.com",
  projectId: "gamify-4bd2f",
  storageBucket: "gamify-4bd2f.appspot.com",
  messagingSenderId: "845760233712",
  appId: "1:845760233712:web:0eb02cbbee4f6c1bef0235",
  measurementId: "G-CYS3HSQLZF",
  databaseURL: "https://gamify-4bd2f-default-rtdb.firebaseio.com/",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app); // Realtime Database

// 🚀 **Register New User**
async function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const fullName = document.getElementById("full_name").value.trim();

  if (!validateEmail(email) || !validatePassword(password)) {
    alert("Invalid Email or Password!");
    return;
  }
  if (!validateField(fullName)) {
    alert("Full name is required!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User registered:", user.uid);

    // Store in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      full_name: fullName,
      user_id: user.uid,
      created_at: serverTimestamp(),
    });

    // Store in Realtime Database
    await set(ref(rtdb, "users/" + user.uid), {
      email: email,
      full_name: fullName,
      user_id: user.uid,
      created_at: Date.now(),
    });

    alert("User registered successfully!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
}

// 🚀 **Login Existing User**
async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!validateEmail(email) || !validatePassword(password)) {
    alert("Invalid login credentials!");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User logged in:", user.uid);

    // Update last login timestamp in Firestore
    await setDoc(
      doc(db, "users", user.uid),
      { last_login: serverTimestamp() },
      { merge: true }
    );

    // Update last login timestamp in Realtime Database
    await update(ref(rtdb, "users/" + user.uid), { last_login: Date.now() });

    alert("Login successful!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
}

// 🚀 **Logout Function**
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

// ✅ Export Functions
export { register, login, logout };
