// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "countryscope-851df.firebaseapp.com",
  projectId: "countryscope-851df",
  storageBucket: "countryscope-851df.firebasestorage.app",
  messagingSenderId: "225951343114",
  appId: "1:225951343114:web:c76862372ee79c086cb5f3",
  measurementId: "G-G5YC9310E9",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
