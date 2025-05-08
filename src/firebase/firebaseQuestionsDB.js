// firebaseConfig.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const vaepFirebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_VAEP_APIKEY,
  authDomain: import.meta.env.VITE_REACT_APP_VAEP_AUTHDOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_VAEP_PROJECTID,
  storageBucket: import.meta.env.VITE_REACT_APP_VAEP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_VAEP_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_REACT_APP_VAEP_APPID,
  measurementId: import.meta.env.VITE_REACT_APP_VAEP_MEASUREMENTID,
};

let vaepFirebaseDB;

const existingApps = getApps();
const alreadyInitialized = existingApps.find((app) => app.name === "secondary");

if (!alreadyInitialized) {
  vaepFirebaseDB = initializeApp(vaepFirebaseConfig, "secondary"); // nombre personalizado
} else {
  vaepFirebaseDB = alreadyInitialized;
}

export default vaepFirebaseDB;
