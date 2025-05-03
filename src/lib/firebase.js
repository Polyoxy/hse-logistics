// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiQTjDTNaw1fWxNqAY3LTuoHqAAoVM7tM",
  authDomain: "hse-logistics.firebaseapp.com",
  projectId: "hse-logistics",
  storageBucket: "hse-logistics.appspot.com",
  messagingSenderId: "751635144731",
  appId: "1:751635144731:web:9cebd29b044c68dc5258be",
  measurementId: "G-PQEJLX9KHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth, db, storage, analytics };
