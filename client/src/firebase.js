// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-a3399.firebaseapp.com",
    projectId: "mern-estate-a3399",
    storageBucket: "mern-estate-a3399.appspot.com",
    messagingSenderId: "619421325372",
    appId: "1:619421325372:web:7a8f6e73328c93543ccb39",
    measurementId: "G-B2Y55H40RZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
