import React, { useState, useEffect, useContext } from "react";
import { Stage } from "react-konva";
import HexagonLayer from "./HexagonLayer.jsx";
import TriangleLayer from "./TriangleLayer.jsx";
import ConnectionLayer from "./ConnectionLayer.jsx";
import VertexLayer from "./VertexLayer.jsx";
import VertexGrid from "./VertexGrid.jsx";
import useVertexSelection from "../hooks/useVertexSelection";
import styles from "../styles/components/Gameboard.module.css";
import CustomAlert from "../../core/design/Alert.jsx";
import QuestionDialog from "./QuestionDialog.jsx";
import NoMoreQuestionsDialog from "./NoMoreQuestionsDialog.jsx";
import { GameContext } from "../../../contexts/GameContext.jsx";

const GameBoard = () => {
  const { state, dispatch } = useContext(GameContext);
  const [showNoMoreQuestionsDialog, setShowNoMoreQuestionsDialog] =
    useState(false);

  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [invalidMoveAlert, setInvalidMoveAlert] = useState(null);
  const [incorrectAnswerAlert, setIncorrectAnswerAlert] = useState(false);

  const [questionData, setQuestionData] = useState({
    open: false,
    question: "",
    options: [],
    correctAnswer: "",
    onSuccess: () => {},
    onFail: () => {},
  });

  useEffect(() => {
    const handleResize = () => {
      setStageSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const sinPreguntas =
      state.mode === "conPreguntas" && state.vaepData?.preguntas?.length === 0;

    if (sinPreguntas) {
      setShowNoMoreQuestionsDialog(true);
    }
  }, [state.vaepData, state.mode]);

  const [connections, setConnections] = useState([]);
  const [triangles, setTriangles] = useState([]);

  const polygonX = stageSize.width / 2;
  const polygonY = stageSize.height / 2.3;
  const radius = stageSize.width / 4.1;
  const vertexSpacing = stageSize.width / 10; // 12

  const rows = [3, 4, 5, 4, 3];

  const vertices = VertexGrid({ polygonX, polygonY, vertexSpacing, rows });
  const { handleVertexClick, selectedVertexIndex } = useVertexSelection(
    vertices,
    setConnections,
    setTriangles,
    setInvalidMoveAlert,
    setQuestionData
  );

  return (
    <div className={styles.boardContainer}>
      <Stage width={stageSize.width} height={stageSize.height}>
        <HexagonLayer x={polygonX} y={polygonY} radius={radius} />
        <TriangleLayer triangles={triangles} />
        <ConnectionLayer connections={connections} />
        <VertexLayer
          vertices={vertices}
          selectedVertex={selectedVertexIndex}
          onVertexClick={handleVertexClick}
        />
      </Stage>

      <QuestionDialog
        open={questionData.open}
        question={questionData.question}
        options={questionData.options}
        correctAnswer={questionData.correctAnswer}
        onCorrect={() => {
          questionData.onSuccess();
          setQuestionData((prev) => ({ ...prev, open: false }));
        }}
        onIncorrect={() => {
          questionData.onFail();
          setQuestionData((prev) => ({ ...prev, open: false }));
          setIncorrectAnswerAlert(true);
        }}
        onClose={() => setQuestionData((prev) => ({ ...prev, open: false }))}
      />

      <CustomAlert
        open={Boolean(invalidMoveAlert)}
        onClose={() => setInvalidMoveAlert(null)}
        severity="warning"
        title="Movimiento inválido"
        message={invalidMoveAlert}
      />

      <CustomAlert
        open={incorrectAnswerAlert}
        onClose={() => setIncorrectAnswerAlert(false)}
        severity="error"
        title="Respuesta incorrecta"
        message="Fallaste la pregunta. Presta más atención la próxima vez."
      />

      <NoMoreQuestionsDialog
        open={showNoMoreQuestionsDialog}
        onContinue={() => {
          dispatch({ type: "SET_MODE", payload: "sinPreguntas" });
          setShowNoMoreQuestionsDialog(false);
        }}
        onEnd={() => {
          dispatch({ type: "GAME_OVER" });
          setShowNoMoreQuestionsDialog(false);
        }}
      />
    </div>
  );
};

export default GameBoard;
