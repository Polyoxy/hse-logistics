// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiQTjDTNaw1fWxNqAY3LTuoHqAAoVM7tM",
  authDomain: "hse-logistics.firebaseapp.com",
  projectId: "hse-logistics",
  storageBucket: "hse-logistics.firebasestorage.app",
  messagingSenderId: "751635144731",
  appId: "1:751635144731:web:9cebd29b044c68dc5258be",
  measurementId: "G-PQEJLX9KHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
