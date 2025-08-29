import React, { useState, useEffect, useContext, useRef } from "react";
import { Stage } from "react-konva";
import HexagonLayer from "./HexagonLayer.jsx";
import TriangleLayer from "./TriangleLayer.jsx";
import ConnectionLayer from "./ConnectionLayer.jsx";
import VertexLayer from "./VertexLayer.jsx";
import VertexGrid from "./VertexGrid.jsx";
import useVertexSelection from "@hooks/useVertexSelection.jsx";
import styles from "@styles/components/board/Gameboard.module.css";
import CustomAlert from "@components/ui/Alert.jsx";
import QuestionDialog from "@components/dialogs/QuestionDialog.jsx";
import NoMoreQuestionsDialog from "@components/dialogs/NoMoreQuestionsDialog.jsx";
import { GameContext } from "@contexts/GameContext.jsx";
import useStageSize from "@hooks/useStageSize.jsx";

const GameBoard = () => {
  const { state, dispatch } = useContext(GameContext);
  const [showNoMoreQuestionsDialog, setShowNoMoreQuestionsDialog] =
    useState(false);

  const [boardRef, stageSize] = useStageSize();


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
    const sinPreguntas =
      state.mode === "conPreguntas" && state.vaepData?.preguntas?.length === 0;

    if (sinPreguntas) {
      setShowNoMoreQuestionsDialog(true);
    }
  }, [state.vaepData, state.mode]);

  const [connections, setConnections] = useState([]);
  const [triangles, setTriangles] = useState([]);

  const polygonX = stageSize.width / 2;
  const polygonY = stageSize.height / 2;
  const vertexSpacing = Math.min(stageSize.width, stageSize.height) / 5;

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
    <div className={styles.boardContainer} ref={boardRef}>
      {stageSize.width > 0 && stageSize.height > 0 && (
        <Stage width={stageSize.width} height={stageSize.height}>
          <HexagonLayer
            x={stageSize.width / 2}
            y={stageSize.height / 2}
            radius={Math.min(stageSize.width, stageSize.height) / 2}
          />
          <TriangleLayer triangles={triangles} />
          <ConnectionLayer connections={connections} />
          <VertexLayer
            vertices={vertices}
            selectedVertex={selectedVertexIndex}
            onVertexClick={handleVertexClick}
          />
        </Stage>
      )}
      <div>
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
    </div>
  );
};

export default GameBoard;
