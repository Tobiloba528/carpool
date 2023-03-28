// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { FIREBASE_API } from "@env"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:FIREBASE_API,
  authDomain: "carpool-89191.firebaseapp.com",
  projectId: "carpool-89191",
  storageBucket: "carpool-89191.appspot.com",
  messagingSenderId: "975766606824",
  appId: "1:975766606824:web:323ff728f5c89a8f3e0a5d"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);

export const db = getFirestore(firebaseApp);
