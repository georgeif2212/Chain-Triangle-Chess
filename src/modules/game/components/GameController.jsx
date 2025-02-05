import { useContext } from "react";
import { GameContext } from "../../../contexts/GameContext.jsx";
import GameBoard from "./Gameboard.jsx";
import { Button } from "@mui/material";

const GameController = () => {
  const { state, dispatch } = useContext(GameContext);
  console.log(state);

  const handleNextTeam = () => {
    dispatch({ type: "NEXT_TEAM" });
  };

  const handleStartGame = () => {
    dispatch({ type: "START_GAME" });
  };

  return (
    <>
      <h2>Current Team: {state.currentTeam ? state.currentTeam.name : "N/A"}</h2>
      
      {!state.gameStarted && (
        <Button variant="contained" color="primary" onClick={handleStartGame}>
          Comenzar juego
        </Button>
      )}

      {state.gameStarted && (
        <GameBoard currentTeam={state.currentTeam} onNextTeam={handleNextTeam} />
      )}
    </>
  );
};

export default GameController;
