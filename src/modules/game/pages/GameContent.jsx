import { useContext } from "react";
import { Typography } from "@mui/material";
import { GameContext } from "../../../contexts/GameContext.jsx";
import GameBoard from "../components/Gameboard.jsx";

const GameContent = () => {
  const { state } = useContext(GameContext);
  return (
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
};

export default GameContent;
