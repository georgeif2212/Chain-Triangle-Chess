import {
  isValidConnection,
  registerNewConnection,
  checkAndRegisterTriangle,
} from "../Rules.jsx";
import { matrixValidEdges } from "../../../../utils/createArrays.jsx";

class QuestionMoveStrategy {
  constructor({
    vertex1,
    vertex2,
    onValidConnection,
    vertices,
    generateNewTriangle,
    context,
    onInvalidConnection,
    showQuestion,
  }) {
    this.vertex1 = vertex1;
    this.vertex2 = vertex2;
    this.onValidConnection = onValidConnection;
    this.vertices = vertices;
    this.generateNewTriangle = generateNewTriangle;
    this.context = context;
    this.onInvalidConnection = onInvalidConnection;
    this.showQuestion = showQuestion;
  }

  execute() {
    if (!isValidConnection(this.vertex1, this.vertex2)) {
      this.onInvalidConnection();
      return;
    }

    const { state, dispatch } = this.context;

    const preguntaIdx = Math.floor(
      Math.random() * state.vaepData.preguntas.length
    );

    const pregunta = state.vaepData.preguntas[preguntaIdx];
    const opciones = state.vaepData.opciones[preguntaIdx];
    const respuestaCorrecta = state.vaepData.respuestas[preguntaIdx];

    this.showQuestion({
      question: pregunta,
      options: opciones,
      correctAnswer: respuestaCorrecta,

      onSuccess: () => {
        dispatch({ type: "NEXT_TEAM" });
        this.onValidConnection(this.vertex1.index, this.vertex2.index);
        const intermediateEdge = registerNewConnection(
          this.vertex1,
          this.vertex2,
          matrixValidEdges[this.vertex1.index - 1][this.vertex2.index - 1],
          state.gameData
        );
        const newEdges = [
          [this.vertex1.index, intermediateEdge],
          [intermediateEdge, this.vertex2.index],
        ];
        checkAndRegisterTriangle(
          newEdges,
          this.vertices,
          this.generateNewTriangle,
          this.context
        );

        this.dispatchQuestionRemoval(preguntaIdx);
      },

      onFail: () => {
        dispatch({ type: "NEXT_TEAM" });
        this.dispatchQuestionRemoval(preguntaIdx);
      },
    });
  }

  dispatchQuestionRemoval(preguntaIdx) {
    const { state, dispatch } = this.context;

    const nuevasPreguntas = [...state.vaepData.preguntas];
    const nuevasOpciones = [...state.vaepData.opciones];
    const nuevasRespuestas = [...state.vaepData.respuestas];

    nuevasPreguntas.splice(preguntaIdx, 1);
    nuevasOpciones.splice(preguntaIdx, 1);
    nuevasRespuestas.splice(preguntaIdx, 1);

    dispatch({
      type: "ACTUALIZAR_VAEP_DATA",
      payload: {
        preguntas: nuevasPreguntas,
        opciones: nuevasOpciones,
        respuestas: nuevasRespuestas,
      },
    });
  }
}

export default QuestionMoveStrategy;
