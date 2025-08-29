import { useState, useEffect, useContext } from "react";
import VertexGrid from "./VertexGrid.jsx";
import useVertexSelection from "@hooks/useVertexSelection.jsx";
import styles from "@styles/components/board/Gameboard.module.css";
import { GameContext } from "@contexts/GameContext.jsx";
import useStageSize from "@hooks/useStageSize.jsx";
import BoardStage from "./BoardStage.jsx";
import BoardDialogs from "./BoardDialogs.jsx";

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
      <BoardStage
        stageSize={stageSize}
        triangles={triangles}
        connections={connections}
        vertices={vertices}
        selectedVertexIndex={selectedVertexIndex}
        handleVertexClick={handleVertexClick}
      />

      <BoardDialogs
        questionData={questionData}
        setQuestionData={setQuestionData}
        invalidMoveAlert={invalidMoveAlert}
        setInvalidMoveAlert={setInvalidMoveAlert}
        incorrectAnswerAlert={incorrectAnswerAlert}
        setIncorrectAnswerAlert={setIncorrectAnswerAlert}
        showNoMoreQuestionsDialog={showNoMoreQuestionsDialog}
        setShowNoMoreQuestionsDialog={setShowNoMoreQuestionsDialog}
        dispatch={dispatch}
      />
    </div>
  );
};

export default GameBoard;
