import { Typography, Button } from "@mui/material";
import { useContext } from "react";
import { GameContext } from "@contexts/GameContext.jsx";
import TeamBox from "@components/ui/TeamBox";
import styles from "@styles/pages/GameHasFinished.module.css";
import CustomButton from "@components/ui/CustomButton.jsx";

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

  const rankedTeams = sortedTeams.map((team, index) => {
    if (team.score !== lastScore) {
      lastRank += 1; // siguiente puesto
      lastScore = team.score;
    }
    return { ...team, rank: lastRank };
  });

  return (
    <div className={styles.gameFinished}>
      <Typography variant="h5" className={styles.title}>
        El juego ha finalizado
      </Typography>

      <Typography variant="h7">
        {winners.length === 1 ? "Ganador" : "Empate entre"}
      </Typography>
      <div className={styles.winnerBoxMulti}>
        {winners.map((team, index) => (
          <TeamBox key={team.name} team={team} index={index} />
        ))}
      </div>

      <div className={styles.resultsBox}>
        <Typography variant="h7">Resultados finales</Typography>
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Equipo</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {rankedTeams.map((team) => {
              // Generamos un color más claro y más oscuro
              const backgroundColor = team.color + "33"; // agrega transparencia ~ 20%
              const borderColor = team.color; // color original para borde
              return (
                <tr
                  key={team.name}
                  style={{
                    backgroundColor: backgroundColor,
                    borderBottom: `2px solid ${borderColor}`,
                  }}
                >
                  <td>{team.rank}</td>
                  <td>{team.name}</td>
                  <td>{team.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <CustomButton
        text="Jugar de nuevo"
        variant="secondary"
        onClick={() => dispatch({ type: "RESET_GAME" })}
      />

    </div>
  );
};

export default GameHasFinished;
