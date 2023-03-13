// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnQZ4TqyeJox5zyNL6g2fl-M9a6atQPa4",
  authDomain: "carpool-89191.firebaseapp.com",
  projectId: "carpool-89191",
  storageBucket: "carpool-89191.appspot.com",
  messagingSenderId: "975766606824",
  appId: "1:975766606824:web:323ff728f5c89a8f3e0a5d"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
