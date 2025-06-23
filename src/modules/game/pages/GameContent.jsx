import { useContext } from "react";
import { Typography } from "@mui/material";
import { GameContext } from "../../../contexts/GameContext.jsx";
import GameBoard from "../components/Gameboard.jsx";
import { useGameParams } from "../hooks/useGameParams.jsx";
import { useLoadQuestions } from "../hooks/useLoadQuestions.jsx";
import { darkenHexColor } from "../../../utils/utils.js";
import styles from "../styles/components/GameContent.module.css";
import { formatMode } from "../../../utils/utils.js";

const GameContent = () => {
  const { state } = useContext(GameContext);

  const params = useGameParams();

  const preguntasCargadas = useLoadQuestions(params); // se llama siempre

  const cargado = state.mode === "conPreguntas" ? preguntasCargadas : true;

  if (state.mode === "conPreguntas" && !cargado) {
    return <div>Cargando preguntas...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <h1>Triangle Chess!</h1>

        <div className={styles.statusInfo}>
          <Typography variant="h6">
            Turno de: <strong>{state.currentTeam?.name}</strong>
          </Typography>
          <Typography variant="subtitle1">
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
                borderColor: darkenHexColor(team.color, 0.3),
              }}
            >
              <Typography variant="h6" className={styles.teamText}>
                {team.name}: {team.score} pts
              </Typography>
            </div>
          ))}
        </div>
      </div>

      <GameBoard />
    </div>
  );
};

export default GameContent;
