// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP8OwEFutkg_nLznxUgA7JnsMdkeZpNu0",
  authDomain: "toy-story-3130a.firebaseapp.com",
  projectId: "toy-story-3130a",
  storageBucket: "toy-story-3130a.firebasestorage.app",
  messagingSenderId: "1089800573904",
  appId: "1:1089800573904:web:90aa2f72778fc9a1111fd5",
  measurementId: "G-NYZF64X8F9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(firebase);

export { auth, googleProvider, db };
