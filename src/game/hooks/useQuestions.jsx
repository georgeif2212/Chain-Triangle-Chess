import { useState, useEffect } from "react";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { setupAuthStateChange } from "@services/QAhandlers.js";
import vaepFirebaseDB from "@customFirebase/firebaseVAEP";

export const useQuestions = ({ materia, tema, token }) => {
  const db = getFirestore(vaepFirebaseDB);
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const [materiaNombre, setMateriaNombre] = useState("");
  const [temaNombre, setTemaNombre] = useState("");
  const [errorSesion, setErrorSesion] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (materia && tema && token) {
      const auth = getAuth(vaepFirebaseDB);
      signInWithCustomToken(auth, token)
        .then(() => {
          const unsubscribe = setupAuthStateChange(
            vaepFirebaseDB,
            db,
            setUser,
            setPreguntas,
            setRespuestas,
            setOpciones,
            materia,
            tema,
            setMateriaNombre,
            setTemaNombre
          );
          return () => unsubscribe();
        })
        .catch((error) => {
          console.error("Error al autenticar con token:", error);
          setErrorSesion(true);
          setTimeout(() => {
            window.location.href =
              "https://vaep-uamc.web.app?sesionExpirada=true";
          }, 3000);
        });
    }
  }, [materia, tema, token]);

  return {
    preguntas,
    respuestas,
    opciones,
    materiaNombre,
    temaNombre,
    errorSesion,
    user,
  };
};
