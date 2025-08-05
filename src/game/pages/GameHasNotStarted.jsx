import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Typography } from "@mui/material";
import { GameContext } from "@contexts/GameContext.jsx";
import { formatMode } from "@utils/utils.js";
import CustomButton from "@components/ui/CustomButton.jsx";
import styles from "@styles/pages/GameHasNotStarted.module.css";

const GameHasNotStarted = () => {
  const { state, dispatch } = useContext(GameContext);
  const navigate = useNavigate();

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
        <CustomButton
          text="Configurar"
          variant="secondary"
          onClick={() => navigate(`/options${location.search}`)}
        />
        <CustomButton
          text="Comenzar juego"
          variant="primary"
          onClick={handleStartGame}
        />
      </div>
    </div>
  );
};

export default GameHasNotStarted;
