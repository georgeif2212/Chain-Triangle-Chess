import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Typography } from "@mui/material";
import { GameContext } from "@contexts/GameContext.jsx";
import { formatMode } from "@utils/utils.js";
import CustomButton from "@components/ui/CustomButton.jsx";
import TeamBox from "@components/ui/TeamBox.jsx";
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
          <TeamBox key={index} team={team} index={index} />
        ))}
      </div>

      <div className={styles.buttonsWrapper}>
        <CustomButton
          text="Configurar"
          variant="primary"
          onClick={() => navigate(`/options${location.search}`)}
        />
        <CustomButton
          text="Comenzar juego"
          variant="secondary"
          onClick={handleStartGame}
        />
      </div>
    </div>
  );
};

export default GameHasNotStarted;
