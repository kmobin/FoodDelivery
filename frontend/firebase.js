// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRBASE_API_KEY,
  authDomain: "food-delivery-8b389.firebaseapp.com",
  projectId: "food-delivery-8b389",
  storageBucket: "food-delivery-8b389.firebasestorage.app",
  messagingSenderId: "287705985266",
  appId: "1:287705985266:web:cfabee8a61927013d6a06b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth}
