import { useContext } from "react";
import { Typography, Container } from "@mui/material";
import { GameContext } from "../../../contexts/GameContext.jsx";
import GameHasFinished from "./GameHasFinished.jsx";
import GameHasNotStarted from "./GameHasNotStarted.jsx";
import GameContent from "./GameContent.jsx";
import "../styles/pages/Game.css";

const Game = () => {
  const { state } = useContext(GameContext);

  return (
    <Container className="game-container">
      {state.gameState === "notStarted" && <GameHasNotStarted />}
      {state.gameState === "started" && <GameContent />}
      {state.gameState === "finished" && <GameHasFinished />}
    </Container>
  );
};

export default Game;
