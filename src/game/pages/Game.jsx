import { Container } from "@mui/material";
import GameContent from "./GameContent.jsx";
import "@styles/pages/Game.css";
const Game = () => {
  return (
    <Container className="game-container">
      <GameContent />
    </Container>
  );
};

export default Game;
