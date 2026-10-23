// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyCRUl6TwpX3JEAWQcDKz38iNTQJB9K4ObU",
  authDomain: "test-cfae7.firebaseapp.com",
  projectId: "test-cfae7",
  storageBucket: "test-cfae7.firebasestorage.app",
  messagingSenderId: "191580878530",
  appId: "1:191580878530:web:d7900afc57c683400dad5b",
  measurementId: "G-HX9EWE2NTT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
let analytics;

// Initialize analytics only in client-side and if measurementId exists
if (typeof window !== "undefined" && firebaseConfig.measurementId) {
  analytics = getAnalytics(app);
}

export { app, db, auth, analytics };
