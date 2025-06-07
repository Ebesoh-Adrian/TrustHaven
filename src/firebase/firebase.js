// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgQ-NXLIkcsIN3c3j-NrmwtU9u7Z-dUO0",
  authDomain: "trusthaven-webapp.firebaseapp.com",
  projectId: "trusthaven-webapp",
  storageBucket: "trusthaven-webapp.firebasestorage.app",
  messagingSenderId: "596883432737",
  appId: "1:596883432737:web:725f3bd10104ef32248a60",
  measurementId: "G-0SWNDP36V0"
};

VITE_FIREBASE_APP_ID="1:596883432737:web:725f3bd10104ef32248a60"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Note: getAnalytics might require specific setup or be optional for your needs
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };