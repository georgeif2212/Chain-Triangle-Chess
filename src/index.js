import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDuyP3vvcs29KznC4Oe4tCwzi2jEbQRAhw",
  authDomain: "triangularchess.firebaseapp.com",
  projectId: "triangularchess",
  storageBucket: "triangularchess.firebasestorage.app",
  messagingSenderId: "687897857402",
  appId: "1:687897857402:web:156aadbe0466251f061ac3"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
