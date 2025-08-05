import { useContext } from "react";
import { Typography } from "@mui/material";
import { GameContext } from "@contexts/GameContext.jsx";
import GameBoard from "@components/board/Gameboard.jsx";
import GameHasFinished from "./GameHasFinished.jsx";
import GameHasNotStarted from "./GameHasNotStarted.jsx";
import { useGameParams } from "@hooks/useGameParams.jsx";
import { useLoadQuestions } from "@hooks/useLoadQuestions.jsx";
import { darkenHexColor, formatMode } from "@utils/utils.js";
import styles from "@styles/components/board/GameContent.module.css";

const GameContent = () => {
  const { state } = useContext(GameContext);
  const params = useGameParams();
  const preguntasCargadas = useLoadQuestions(params);

  const cargado = state.mode === "conPreguntas" ? preguntasCargadas : true;
  if (state.mode === "conPreguntas" && !cargado)
    return <div>Cargando preguntas...</div>;
  if (state.gameState === "notStarted") return <GameHasNotStarted />;
  return (
    <div className={styles.wrapper}>
      {/* Sidebar dinámico */}
      <div className={styles.sidebar}>
        {state.gameState === "started" && (
          <>
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
              {state.teams.map((team, index) => {
                const isCurrent = team.name === state.currentTeam?.name;

                return (
                  <div
                    key={index}
                    className={`${styles.teamBox} ${
                      isCurrent ? styles.currentTeamBox : ""
                    }`}
                    style={{
                      backgroundColor: team.color,
                      borderColor: darkenHexColor(team.color, 0.3),
                    }}
                  >
                    <Typography variant="h6" className={styles.teamText}>
                      {team.name}: {team.score} pts
                    </Typography>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {state.gameState === "finished" && <GameHasFinished />}
      </div>

      {/* GameBoard siempre visible */}
      <GameBoard />
    </div>
  );
};

export default GameContent;
