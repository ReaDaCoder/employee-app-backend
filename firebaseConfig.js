// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASf_dbowtPLonBkM1YbkbsyP8kG5-qNOU",
  authDomain: "employee-app-cecef.firebaseapp.com",
  projectId: "employee-app-cecef",
  storageBucket: "employee-app-cecef.firebasestorage.app",
  messagingSenderId: "1093287668244",
  appId: "1:1093287668244:web:aacb67fd0ddb7b8e261501",
  measurementId: "G-NSZ6NTRKY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);