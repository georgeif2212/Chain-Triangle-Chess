import { doc, getDoc } from "firebase/firestore";
import { getQuestions } from "vaep-transition-toolkit";

// Función para cargar preguntas y respuestas de ambos tipos
export const cargarPreguntasYRespuestas = async (
  temaId,
  setPreguntas,
  setRespuestas,
  setOpciones
) => {
  try {
    const themesArray = temaId;
    const [preguntasRespuestas, preguntasOpcionMultiple] = await getQuestions(
      themesArray
    );

    // Combinar y barajar ambas listas de preguntas
    const todasLasPreguntas = shuffleArray([
      ...preguntasRespuestas,
      ...preguntasOpcionMultiple,
    ]);

    // Separar preguntas, opciones y respuestas
    const preguntasList = todasLasPreguntas.map((item) => item.pregunta);
    const opcionesList = todasLasPreguntas.map((item) =>
      item.tipo === "opcion-multiple" ? item.opciones : []
    );
    const respuestasList = todasLasPreguntas.map((item) =>
      item.tipo === "pregunta-respuesta"
        ? item.respuesta
        : item.respuestaCorrecta
    );

    setPreguntas(preguntasList);
    setOpciones(opcionesList);
    setRespuestas(respuestasList);
  } catch (error) {
    console.error("Error al cargar preguntas y respuestas:", error);
  }
};

// Función para barajar un arreglo de manera aleatoria
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Función para obtener el nombre de un documento dado su ID
const obtenerNombreDocumento = async (
  db,
  userId,
  materiaId,
  temaId,
  setMateriaNombre,
  setTemaNombre
) => {
  try {
    // Obtener nombre de la materia
    const materiaDocRef = doc(
      db,
      "usuarios",
      userId.uid,
      "materias",
      materiaId
    );
    const materiaDocSnap = await getDoc(materiaDocRef);

    if (materiaDocSnap.exists()) {
      const materiaData = materiaDocSnap.data();
      setMateriaNombre(materiaData.nombre);
    } else {
      console.log("No se encontró el documento de la materia");
      setMateriaNombre(null);
    }

    // Obtener nombre del tema
    const temaDocRef = doc(
      db,
      "usuarios",
      userId.uid,
      "materias",
      materiaId,
      "temas",
      temaId
    );
    const temaDocSnap = await getDoc(temaDocRef);

    if (temaDocSnap.exists()) {
      const temaData = temaDocSnap.data();
      setTemaNombre(temaData.nombre);
    } else {
      console.log("No se encontró el documento del tema");
      setTemaNombre(null);
    }
  } catch (error) {
    console.error("Error al obtener los nombres:", error);
    setMateriaNombre(null);
    setTemaNombre(null);
  }
};

export const setupAuthStateChange = (
  setPreguntas,
  setRespuestas,
  setOpciones,
  temaId
) => {
  cargarPreguntasYRespuestas(temaId, setPreguntas, setRespuestas, setOpciones);

  return;
};
