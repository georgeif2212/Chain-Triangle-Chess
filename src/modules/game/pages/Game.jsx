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

  const renderStartButton = () => (
    <Button variant="contained" color="primary" onClick={handleStartGame}>
      Comenzar juego
    </Button>
  );

  const renderGameContent = () => (
    <>
      <Typography variant="h5">
        Turno de: <strong>{state.currentTeam.name}</strong>
      </Typography>
      <Typography >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero, laborum maxime omnis est nemo possimus
        similique numquam blanditiis ipsum perferendis aliquam nihil illum, eveniet facere a, asperiores iure tenetur.
      </Typography>
      <GameBoard />
    </>
  );

  return (
    <Container>
      <Typography variant="h3">Triangle Chess!</Typography>
      {!state.gameStarted ? renderStartButton() : renderGameContent()}
    </Container>
  );
};

export default Game;
