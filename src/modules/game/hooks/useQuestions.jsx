import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import vaepFirebaseDB from "../../../firebase/firebaseVAEP.js";
import { setupAuthStateChange } from "../services/QAhandlers.js";
import { getFirestore } from "firebase/firestore";

const GameSession = () => {
  const db = getFirestore(vaepFirebaseDB);
  const [gameMode, setGameMode] = useState('conPreguntas');

  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const [materia, setMateria] = useState('');
  const [tema, setTema] = useState('');
  const [temaNombre, setTemaNombre] = useState('');
  const [materiaNombre, setMateriaNombre] = useState(''); 
  const [errorSesion, setErrorSesion] = useState(false);


  // Lee la materia y tema seleccionados desde la URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    const materiaParam = params.get("materia");
    const temaParam = params.get("tema");
    const tokenParam = params.get("token");

    if (mode) {
      setGameMode(mode);
    }
    if (materiaParam) {
      setMateria(materiaParam);
    }
    if (temaParam) {
      setTema(temaParam);
    }
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, []);

  // Obtiene los datos de la BD
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
  console.log("PREGUNTAS",preguntas);
  console.log("RESPUESTAS",respuestas)
  console.log("Opciones",opciones)
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Preguntas para {materiaNombre} - {temaNombre}
      </Typography>
      {preguntas.map((p,index) => (
        <div key={index}>
          <Typography variant="subtitle1">{p}</Typography>
          {/* Aquí puedes mostrar opciones o más detalles */}
        </div>
      ))}
    </Container>
  );
};

export default GameSession;