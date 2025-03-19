import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { analytics } from "./firebase/firebaseConfiguration.js";
// import {
//   getAuth,
//   setPersistence,
//   browserLocalPersistence,
// } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// import { AuthProvider } from "./contexts/AuthContext.jsx";
import { GameProvider } from "./contexts/GameContext.jsx";

// export const auth = getAuth(app);
// export const db = getFirestore(app);

//  setPersistence(auth, browserLocalPersistence);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <>
      <GameProvider>
        <App />
      </GameProvider>
    </>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
