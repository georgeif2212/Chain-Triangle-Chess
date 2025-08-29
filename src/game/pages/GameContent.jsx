import { useContext } from "react";
import { Typography } from "@mui/material";
import { GameContext } from "@contexts/GameContext.jsx";
import GameBoard from "@components/board/Gameboard.jsx";
import GameHasFinished from "./GameHasFinished.jsx";
import GameHasNotStarted from "./GameHasNotStarted.jsx";
import { useGameParams } from "@hooks/useGameParams.jsx";
import { useQuestionsLoader } from "@hooks/useQuestionsLoader.jsx";

import { darkenHexColor, formatMode } from "@utils/utils.js";
import styles from "@styles/components/board/GameContent.module.css";

const GameContent = () => {
  const { state } = useContext(GameContext);

  const params = useGameParams();
  const preguntasCargadas = useQuestionsLoader(params);

  const cargado = state.mode === "conPreguntas" ? preguntasCargadas : true;

  if (state.mode === "conPreguntas" && !cargado)
    return <div>Cargando preguntas...</div>;

  if (state.gameState === "notStarted") return <GameHasNotStarted />;

  return (
    <div className={styles.wrapper_game}>
      <div className={styles.sidebar_game}>
        {state.gameState === "started" && (
          <div className={styles.gameInfo}>
            <Typography variant="h4" className={styles.title}>
              Triangle Chess!
            </Typography>

            <div className={styles.statusInfo}>
              <Typography variant="subtitle1" style={{ marginBottom: "2rem" }}>
                Modo: <strong>{formatMode(state.mode)}</strong>
              </Typography>
              <Typography variant="h7">
                Turno de: <strong>{state.currentTeam?.name}</strong>
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
                      backgroundColor: `${team.color}90`,
                      borderColor: darkenHexColor(team.color, 0.3),
                    }}
                  >
                    <Typography variant="subtitle2" className={styles.teamText}>
                      {team.name}: {team.score} pts
                    </Typography>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {state.gameState === "finished" && <GameHasFinished />}
      </div>

      <GameBoard />
    </div>
  );
};

export default GameContent;
