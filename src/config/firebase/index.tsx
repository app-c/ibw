import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOGWi0egb8xk_IqiqeT-ov89U6Ayvip54",
  authDomain: "ibigwave-faf91.firebaseapp.com",
  projectId: "ibigwave-faf91",
  storageBucket: "ibigwave-faf91.appspot.com",
  messagingSenderId: "490098510390",
  appId: "1:490098510390:web:f08633d8d67419fdf0e697",
  measurementId: "G-YRTYY7L6DW",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
