// GameHasNotStarted.jsx
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../../contexts/GameContext";
import { useContext } from "react";
import { Button, Typography, Box } from "@mui/material";
import { formatMode } from "../../../utils/utils";
import styles from "../styles/pages/GameHasNotStarted.module.css";

const GameHasNotStarted = () => {
  const { state, dispatch } = useContext(GameContext);
  const navigate = useNavigate();
  console.log(state);

  const handleStartGame = () => {
    const updatedTeams = state.teams.map((team) => ({
      ...team,
      score: 0,
    }));

    dispatch({ type: "SET_TEAMS", payload: updatedTeams });
    dispatch({ type: "START_GAME" });
  };

  return (
    <div className={styles.wrapper}>
      <Typography variant="h3" className={styles.title}>
        Triangle Chess!
      </Typography>

      <Typography variant="h6" className={styles.mode}>
        Modo: <strong>{formatMode(state.mode)}</strong>
      </Typography>

      <div className={styles.teamsContainer}>
        {state.teams.map((team, index) => (
          <div
            key={index}
            className={styles.teamCard}
            style={{ borderColor: team.color }}
          >
            <Typography variant="body1" className={styles.teamText}>
              Equipo {index + 1}: <strong>{team.name}</strong>
            </Typography>
          </div>
        ))}
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate(`/options${location.search}`)}
        >
          Configurar
        </Button>
        <Button variant="contained" color="primary" onClick={handleStartGame}>
          Comenzar juego
        </Button>
      </div>
    </div>
  );
};

export default GameHasNotStarted;
