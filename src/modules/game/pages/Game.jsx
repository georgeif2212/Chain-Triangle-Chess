import { useContext } from "react";
import { Typography, Container } from "@mui/material";
import { GameContext } from "../../../contexts/GameContext.jsx";
import { useGameParams } from "../hooks/useGameParams.jsx";
import { useLoadQuestions } from "../hooks/useLoadQuestions.jsx";
import GameHasFinished from "./GameHasFinished.jsx";
import GameHasNotStarted from "./GameHasNotStarted.jsx";
import GameContent from "./GameContent.jsx";
import "../styles/pages/Game.css";

const Game = () => {
  const { state, dispatch } = useContext(GameContext);
  const params = useGameParams(({ mode }) => {
    if (mode === "conPreguntas" && state.gameState === "notStarted") {
      dispatch({ type: "START_GAME" });
    }
  });

  useLoadQuestions(params);

  return (
    <Container className="game-container">
      <Typography variant="h3">Triangle Chess!</Typography>
      {state.gameState === "notStarted" && <GameHasNotStarted />}
      {state.gameState === "started" && <GameContent />}
      {state.gameState === "finished" && <GameHasFinished state={state} />}
    </Container>
  );
};

export default Game;
