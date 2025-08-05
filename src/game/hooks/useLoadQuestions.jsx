// hooks/useLoadQuestions.js
import { useEffect, useState } from "react";
import { useQuestions } from "./useQuestions.jsx";
import { useContext } from "react";
import { GameContext } from "@contexts/GameContext.jsx";

export const useLoadQuestions = ({ materia, tema, token }) => {
  const { dispatch } = useContext(GameContext);
  const {
    preguntas,
    respuestas,
    opciones,
    materiaNombre,
    temaNombre,
    errorSesion,
    user,
  } = useQuestions({ materia, tema, token });
  const [cargado, setCargado] = useState(false);
  useEffect(() => {
    const datosListos =
      preguntas.length && respuestas.length && opciones.length && user;

    if (!cargado && datosListos) {
      dispatch({
        type: "LOAD_QUESTIONS",
        payload: {
          preguntas,
          respuestas,
          opciones,
          materiaNombre,
          temaNombre,
          user,
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
  }, [
    preguntas,
    respuestas,
    opciones,
    materiaNombre,
    temaNombre,
    user, 
    errorSesion,
  ]);

  return cargado;
};
