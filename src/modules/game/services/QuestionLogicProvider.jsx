import { useEffect } from "react";
import { useQuestions } from "../hooks/useQuestions.jsx";
import { useContext } from "react";
import { GameContext } from "../../../contexts/GameContext.jsx"; // o donde guardes tus preguntas

const QuestionLogicProvider = ({ materia, tema, token }) => {
  const {
    preguntas,
    respuestas,
    opciones,
    materiaNombre,
    temaNombre,
    errorSesion,
  } = useQuestions({ materia, tema, token });
  const { dispatch } = useContext(GameContext);

  useEffect(() => {
    if (preguntas.length && respuestas.length && opciones.length) {
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
    }
    if (errorSesion) {
      console.error("Sesión expirada. Redirigiendo...");
      setTimeout(() => {
        window.location.href = "https://vaep-uamc.web.app?sesionExpirada=true";
      }, 3000);
    }
  }, []);

  return null; // no renderiza nada
};

export default QuestionLogicProvider;
