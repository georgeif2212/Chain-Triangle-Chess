import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TeamListContainer from "@components/layout/TeamListContainer.jsx";
import CustomButton from "@components/ui/CustomButton.jsx";
import useOptions from "@hooks/useOptions.jsx";
import { formatMode } from "@utils/utils.js";
import { GameContext } from "@contexts/GameContext.jsx";
import styles from "@styles/pages/Options.module.css";

const Options = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useContext(GameContext);

  const {
    teams,
    handleTeamChange,
    handleAddTeam,
    handleRemoveTeam,
    handleRandomizeOrder,
    handleOptionsStartGame,
  } = useOptions();

  return (
    <div className={styles.optionsCard}>
      <Typography variant="h4" className={styles.title}>
        Opciones del Juego
      </Typography>

      <Typography variant="h7" className={styles.gameMode}>
        Modo: <strong>{formatMode(state.mode)}</strong>
      </Typography>

      <div style={{ margin: "1em" }}>
        <TeamListContainer teams={teams} onTeamChange={handleTeamChange} />
      </div>

      <div className={styles.teamButtons}>
        <Button
          onClick={handleAddTeam}
          disabled={teams.length >= 4}
          variant="contained"
          className={styles.button}
        >
          +
        </Button>
        <Button
          onClick={handleRemoveTeam}
          disabled={teams.length <= 2}
          variant="contained"
          color="error"
          className={styles.button}
        >
          -
        </Button>
      </div>
      <div className={styles.box}>
        <div className={styles.orderButtons}>
          <CustomButton
            text="Orden aleatorio"
            variant="primary"
            onClick={handleRandomizeOrder}
          />
        </div>

        <CustomButton
          text="Jugar"
          variant="secondary"
          onClick={() => navigate(`/game${location.search}`)}
        />
      </div>
    </div>
  );
};

export default Options;
