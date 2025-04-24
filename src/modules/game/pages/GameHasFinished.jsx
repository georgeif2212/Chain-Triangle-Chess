import { Typography, Button, Container } from "@mui/material";

const GameHasFinished = (state) => {
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
          console.log("reset");
        }}
      >
        Jugar de nuevo
      </Button>
    </div>
  );
};

export default GameHasFinished;
