import { useContext } from "react";
import { Typography, Container } from "@mui/material";
import { GameContext } from "../../../contexts/GameContext.jsx";
import GameBoard from "../components/Gameboard.jsx";
import GameHasFinished from "./GameHasFinished.jsx";
import GameHasNotStarted from "./GameHasNotStarted.jsx";
import "../styles/pages/Game.css";

const Game = () => {
  const { state } = useContext(GameContext);
  const GameContent = () => (
    <>
      <div>
        {state.teams.map((team, index) => (
          <Typography key={index} variant="h5">
            <strong>{team.name}:</strong> Puntaje: {team.score}
          </Typography>
        ))}
        <Typography variant="h5">
          Turno de: <strong>{state.currentTeam.name}</strong>
        </Typography>
      </div>

      <GameBoard />
    </>
  );


  return (
    <Container className="game-container">
      <Typography variant="h3">Triangle Chess!</Typography>
      {state.gameState === "notStarted" && GameHasNotStarted()}
      {state.gameState === "started" && GameContent()}
      {state.gameState === "finished" && GameHasFinished(state)}
    </Container>
  );
};

export default Game;
