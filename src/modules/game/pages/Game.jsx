import { useContext } from "react";
import { Typography, Button, Container } from "@mui/material";
import { GameContext } from "../../../contexts/GameContext.jsx";
import GameBoard from "../components/Gameboard.jsx";
import "../styles/pages/Game.css";

const Game = () => {
  const { state, dispatch } = useContext(GameContext);
  const handleStartGame = () => {
    dispatch({ type: "START_GAME" });
  };

  const renderGameNotStarted = () => (
    <>
      <div>
        <p>
          <strong>Mode: </strong>
          {state.mode}
        </p>
        <p>Equipos: </p>
        {state.teams.map((team, index) => (
          <p key={index}>
            <strong>Team {index + 1}: </strong>
            {team.name}
          </p>
        ))}
      </div>
      <Button variant="contained" color="primary" onClick={handleStartGame}>
        Comenzar juego
      </Button>
    </>
  );

  const renderGameContent = () => (
    <>
      <Typography variant="h5">
        Turno de: <strong>{state.currentTeam.name}</strong>
      </Typography>
      <GameBoard />
    </>
  );

  return (
    <Container className="game-container ">
      <Typography variant="h3">Triangle Chess!</Typography>
      {!state.gameStarted ? renderGameNotStarted() : renderGameContent()}
    </Container>
  );
};

export default Game;
