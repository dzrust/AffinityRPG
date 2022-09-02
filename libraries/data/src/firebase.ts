// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import * as firebaseUI from "firebaseui";
import { browserLocalPersistence, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBG4W_oDu2hVKiLuGS1gRrQ1jW61c5bmZo",
  authDomain: "rpg-mobile-d6bc0.firebaseapp.com",
  projectId: "rpg-mobile-d6bc0",
  storageBucket: "rpg-mobile-d6bc0.appspot.com",
  messagingSenderId: "325778762264",
  appId: "1:325778762264:web:170bc3ab3f9be82603316d",
  measurementId: "G-6Y195V36CY",
  databaseUrl: "",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
firebaseAuth.setPersistence(browserLocalPersistence);
export const firebaseAuthUI = new firebaseUI.auth.AuthUI(firebaseAuth);
export const firestoreDB = getFirestore(firebaseApp);
