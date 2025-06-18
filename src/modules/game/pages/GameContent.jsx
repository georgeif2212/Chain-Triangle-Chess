import { useContext } from "react";
import { Typography } from "@mui/material";
import { GameContext } from "../../../contexts/GameContext.jsx";
import GameBoard from "../components/Gameboard.jsx";
import { useGameParams } from "../hooks/useGameParams.jsx";
import { useLoadQuestions } from "../hooks/useLoadQuestions.jsx";
import { darkenColor } from "../../../utils/utils.js";
import styles from "../styles/components/GameContent.module.css";
import { formatMode } from "../../../utils/utils.js";

const GameContent = () => {
  const { state } = useContext(GameContext);

  const params = useGameParams();

  const cargado =
    state.mode === "conPreguntas" ? useLoadQuestions(params) : true;

  if (state.mode === "conPreguntas" && !cargado) {
    return <div>Cargando preguntas...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <Typography variant="h3">Triangle Chess!</Typography>
      <div className={styles.statusInfo}>
        <Typography variant="h6">
          Modo: <strong>{formatMode(state.mode)}</strong>
        </Typography>
      </div>

      <div className={styles.topBar}>
        {state.teams.map((team, index) => (
          <div
            key={index}
            className={styles.teamBox}
            style={{
              backgroundColor: team.color,
              border: `3px solid ${darkenColor(team.color)}`,
            }}
          >
            <Typography variant="h6" className={styles.teamText}>
              {team.name}: {team.score} pts
            </Typography>
          </div>
        ))}
      </div>
      <Typography variant="subtitle1">
        Turno de: <strong>{state.currentTeam?.name}</strong>
      </Typography>
      <GameBoard />
    </div>
  );
};

export default GameContent;
