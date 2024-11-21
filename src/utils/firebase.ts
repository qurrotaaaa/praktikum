// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb8zN3FLBN6gqRh4nr1O80ztVfGkgxgUQ",
  authDomain: "vue-firebase-3c264.firebaseapp.com",
  projectId: "vue-firebase-3c264",
  storageBucket: "vue-firebase-3c264.firebasestorage.app",
  messagingSenderId: "221664946336",
  appId: "1:221664946336:web:1013e14a1a7ad9472b81c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(firebase);

export { auth, googleProvider, db };
