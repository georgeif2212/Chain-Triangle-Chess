// hooks/useLoadQuestions.js
import { useEffect, useState } from "react";
import { useQuestions } from "./useQuestions.jsx";
import { useContext } from "react";
import { GameContext } from "../../../contexts/GameContext.jsx"

export const useLoadQuestions = ({ materia, tema, token }) => {
  const { dispatch } = useContext(GameContext);
  const {
    preguntas,
    respuestas,
    opciones,
    materiaNombre,
    temaNombre,
    errorSesion,
  } = useQuestions({ materia, tema, token });

  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    if (!cargado && preguntas.length && respuestas.length && opciones.length) {
      dispatch({
        type: "LOAD_QUESTIONS",
        payload: {
          preguntas,
          respuestas,
          opciones,
          materiaNombre,
          temaNombre,
        },
      });
      setCargado(true);
    }

    if (errorSesion) {
      console.error("Sesión expirada. Redirigiendo...");
      setTimeout(() => {
        window.location.href = "https://vaep-uamc.web.app?sesionExpirada=true";
      }, 3000);
    }
  }, [preguntas, respuestas, opciones, materiaNombre, temaNombre, errorSesion]);

  return cargado;
};
