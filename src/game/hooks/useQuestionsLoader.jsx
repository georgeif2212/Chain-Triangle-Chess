import { useContext, useState, useEffect } from "react";
import { GameContext } from "@contexts/GameContext";
import { setupAuthStateChange } from "@services/QAhandlers";
export const useQuestionsLoader = ({ themes }) => {
  const { state, dispatch } = useContext(GameContext);

  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    // Si ya existe vaepData, no vuelvas a cargar
    if (state.vaepData || !themes) return;

    setupAuthStateChange(setPreguntas, setRespuestas, setOpciones, themes);
  }, [themes, state.vaepData]);

  useEffect(() => {
    const datosListos =
      preguntas.length && respuestas.length && opciones.length;

    if (!cargado && datosListos) {
      dispatch({
        type: "LOAD_QUESTIONS",
        payload: { preguntas, respuestas, opciones },
      });
      setCargado(true);
    }
  }, [preguntas, respuestas, opciones, cargado, dispatch]);

  return state.vaepData ? true : cargado;
};
