require('dotenv').config();

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
const { initializeApp } = require('firebase/app');
// const {getAnalytics,  isSupported} = require('firebase/analytics');



const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// if (isSupported()) {
//   const analytics = getAnalytics(app);
// } else {
//   console.log('Firebase Analytics is not supported in this environment.');
// }
module.exports = {
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  project_id: process.env.FIREBASE_PROJECT_ID,
};



// const firebaseConfig = {
//   apiKey: "AIzaSyASf_dbowtPLonBkM1YbkbsyP8kG5-qNOU",
//   authDomain: "employee-app-cecef.firebaseapp.com",
//   projectId: "employee-app-cecef",
//   storageBucket: "employee-app-cecef.firebasestorage.app",
//   messagingSenderId: "1093287668244",
//   appId: "1:1093287668244:web:aacb67fd0ddb7b8e261501",
//   measurementId: "G-NSZ6NTRKY7"
// };