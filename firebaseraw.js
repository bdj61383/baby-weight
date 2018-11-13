var Firebase = window.Firebase || {};

Firebase.firebase = require("firebase");

// Required for side-effects
Firebase.firestore = require("firebase/firestore");

window.firebase.initializeApp({
  apiKey: "AIzaSyDCsWnXWYhTM9H8AF44epIKAg2XbDibJ5c",
  authDomain: "pregnancy-weight-tracker-7cae0.firebaseapp.com",
  databaseURL: "https://pregnancy-weight-tracker-7cae0.firebaseio.com",
  projectId: "pregnancy-weight-tracker-7cae0",
  storageBucket: "pregnancy-weight-tracker-7cae0.appspot.com",
  messagingSenderId: "328858966696"
});

// var 

// const db = firebase.firestore();

// // Disable deprecated features
// db.settings({
//   timestampsInSnapshots: true
// });

// var db = firebase.firestore();

module.exports = {
  firebase: Firebase
}

// Initialize Cloud Firestore through Firebase



