import { Typography, Button } from "@mui/material";
import { useContext } from "react";
import { GameContext } from "../../../contexts/GameContext.jsx";

const GameHasFinished = () => {
  const { state, dispatch } = useContext(GameContext);
  
  const sortedTeams = [...state.teams].sort((a, b) => b.score - a.score);

  return (
    <div className="game-summary">
      <Typography variant="h4">🎉 ¡El juego ha finalizado! 🎉</Typography>
      <Typography variant="h5">
        🏆 Ganador: <strong>{sortedTeams[0].name}</strong> con{" "}
        {sortedTeams[0].score} puntos
      </Typography>

      <Typography variant="h6">📊 Resultados finales:</Typography>
      <ul>
        {sortedTeams.map((team, index) => (
          <li key={team.name}>
            {index + 1}. {team.name} - {team.score} puntos
          </li>
        ))}
      </ul>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch({ type: "RESET_GAME" });
        }}
      >
        Jugar de nuevo
      </Button>
    </div>
  );
};

export default GameHasFinished;
