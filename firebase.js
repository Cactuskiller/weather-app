
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAX77MnlwfnyTV5FomcYIQrL3OB9QdHl9U",
  authDomain: "weatherapp-6727c.firebaseapp.com",
  projectId: "weatherapp-6727c",
  storageBucket: "weatherapp-6727c.firebasestorage.app",
  messagingSenderId: "904677718618",
  appId: "1:904677718618:web:740f339e469c67e922f663",
  measurementId: "G-XD2HJSP9B3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firebase Storage
const storage = getStorage(app);
export const firestore = getFirestore(app);

export { auth, storage };