import { Typography, Button } from "@mui/material";
import { useContext } from "react";
import { GameContext } from "@contexts/GameContext.jsx";
import styles from "@styles/pages/GameHasFinished.module.css";

const GameHasFinished = () => {
  const { state, dispatch } = useContext(GameContext);

  // Obtener ganadores (empates en primer lugar)
  const maxScore = Math.max(...state.teams.map((t) => t.score));
  const winners = state.teams.filter((t) => t.score === maxScore);

  // Ordenar todos los equipos por puntaje descendente
  const sortedTeams = [...state.teams].sort((a, b) => b.score - a.score);

  // Calcular ranking con empates
  let lastScore = null;
  let lastRank = 0;
  let skip = 0;
  const rankedTeams = sortedTeams.map((team, index) => {
    if (team.score !== lastScore) {
      lastRank = index + 1 + skip;
      lastScore = team.score;
    } else {
      skip += 1;
    }
    return { ...team, rank: lastRank };
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Typography variant="h4" className={styles.title}>
          El juego ha finalizado
        </Typography>

        <div className={styles.winnerBoxMulti}>
          <Typography variant="h6" className={styles.winnerLabel}>
            {winners.length === 1 ? "Ganador" : "Empate entre"}
          </Typography>

          {winners.map((team) => (
            <div
              key={team.name}
              className={styles.winnerBox}
              style={{ backgroundColor: team.color }}
            >
              <Typography variant="h5" className={styles.winnerName}>
                {team.name}
              </Typography>
              <Typography variant="body1" className={styles.winnerPoints}>
                {team.score} puntos
              </Typography>
            </div>
          ))}
        </div>

        <div className={styles.resultsBox}>
          <Typography variant="subtitle1" className={styles.label}>
            Resultados finales
          </Typography>
          <table className={styles.resultsTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Equipo</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {rankedTeams.map((team) => (
                <tr key={team.name}>
                  <td>{team.rank}</td>
                  <td>{team.name}</td>
                  <td>{team.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button
          variant="contained"
          className={styles.playAgainButton}
          onClick={() => dispatch({ type: "RESET_GAME" })}
        >
          Jugar de nuevo
        </Button>
      </div>
    </div>
  );
};

export default GameHasFinished;
