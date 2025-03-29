// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhZdST85Oojt4X5E5xEWsHVmXTdvQc2Ag",
  authDomain: "nijan-adhikari.firebaseapp.com",
  projectId: "nijan-adhikari",
  storageBucket: "nijan-adhikari.firebasestorage.app",
  messagingSenderId: "893827452137",
  appId: "1:893827452137:web:98c18c380a788478863478",
  measurementId: "G-LHJFD6X25N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export { db, auth };
