import { Typography, Button } from "@mui/material";
import { useContext } from "react";
import { GameContext } from "../../../contexts/GameContext.jsx";
import styles from "../styles/pages/GameHasFinished.module.css";

const GameHasFinished = () => {
  const { state, dispatch } = useContext(GameContext);
  const sortedTeams = [...state.teams].sort((a, b) => b.score - a.score);
  const winner = sortedTeams[0];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Typography variant="h4" className={styles.title}>
          El juego ha finalizado
        </Typography>

        <div
          className={styles.winnerBox}
          style={{ backgroundColor: winner.color }}
        >
          <Typography variant="h6" className={styles.winnerLabel}>
            Ganador
          </Typography>
          <Typography variant="h5" className={styles.winnerName}>
            {winner.name}
          </Typography>
          <Typography variant="body1" className={styles.winnerPoints}>
            {winner.score} puntos
          </Typography>
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
              {sortedTeams.map((team, index) => (
                <tr key={team.name}>
                  <td>{index + 1}</td>
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
