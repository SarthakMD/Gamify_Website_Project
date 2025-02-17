// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAel5q84vsn2Dl_ckZxFYqWX_XrdMrrouA",
  authDomain: "gamify-4bd2f.firebaseapp.com",
  projectId: "gamify-4bd2f",
  storageBucket: "gamify-4bd2f.appspot.com",
  messagingSenderId: "845760233712",
  appId: "1:845760233712:web:0eb02cbbee4f6c1bef0235",
  measurementId: "G-CYS3HSQLZF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up our register function
function register() {
  // Get all our input fields
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var full_name = document.getElementById("full_name").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is Outta Line!!");
    return;
  }

  if (validate_field(full_name) == false) {
    alert("One or More Extra Fields is Outta Line!!");
    return;
  }

  //     // Move on with Auth
  //     auth.createUserWithEmailAndPassword(email, password)
  //         .then(function (credential) {
  //             // Declare user variable
  //             var user = auth.currentUser;

  //             // Add this user to Firestore
  //             var db = firebase.firestore();
  //             var userRef = db.collection('users').doc(user.uid);

  //             // Create User data
  //             var user_data = {
  //                 email: email,
  //                 full_name: full_name,
  //                 user_id: user,
  //             };

  //             // Set data to Firestore
  //             userRef.set(user_data)
  //                 .then(function () {
  //                     // Done
  //                     alert('User Created!!');
  //                     window.location.href = "index.html";
  //                 })
  //                 .catch(function (error) {
  //                     // Handle errors while setting data to Firestore
  //                     alert("Something went wrong . Try again later ");
  //                 });
  //         })
  //         .catch(function (error) {
  //             // Firebase will use this to alert of its errors
  //             var error_code = error.code;
  //             var error_message = error.message;

  //             alert(error_message);
  //         });
  // }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function (credential) {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firestore
      var db = firebase.firestore();
      var userRef = db.collection("users").doc(user.uid);

      // Create User data
      var user_data = {
        email: email,
        full_name: full_name,
        user_id: user.uid, // Store only the UID
      };

      // Set data to Firestore
      userRef
        .set(user_data)
        .then(function () {
          // Done
          alert("User Created!!");
          window.location.href = "index.html";
        })
        .catch(function (error) {
          // Handle errors while setting data to Firestore
          alert("Something went wrong . Try again later ");
        });
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Invalid login credential!!");
    return;
    // Don't continue running the code
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).update(user_data);

      // DOne
      alert("User Logged In!!");
      window.location.href = "index.html";
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
