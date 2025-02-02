// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqyUcfTz-MqujW6-P8auTKk2DeHwOdzVo",
  authDomain: "sidec-8de34.firebaseapp.com",
  projectId: "sidec-8de34",
  storageBucket: "sidec-8de34.firebasestorage.app",
  messagingSenderId: "962136101295",
  appId: "1:962136101295:web:c6355c0555137eb2e39f5a",
  measurementId: "G-8C1DD2F04J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, analytics, db, storage, auth };