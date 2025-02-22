import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZlKENrXqiwrsNzuxB0AECQWxh4vYh_6M",
  authDomain: "bisonhack-9f9a6.firebaseapp.com",
  projectId: "bisonhack-9f9a6",
  storageBucket: "bisonhack-9f9a6.firebasestorage.app",
  messagingSenderId: "291518517315",
  appId: "1:291518517315:web:dfcfd4e4314990977b44f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);