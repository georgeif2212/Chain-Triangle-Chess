import { useContext } from "react";
import { Typography } from "@mui/material";
import { GameContext } from "../../../contexts/GameContext.jsx";
import GameBoard from "../components/Gameboard.jsx";
import { useGameParams } from "../hooks/useGameParams.jsx";
import { useLoadQuestions } from "../hooks/useLoadQuestions.jsx";

const GameContent = () => {
  const { state, dispatch } = useContext(GameContext);

  const params = useGameParams();

  const cargado =
    state.mode === "conPreguntas" ? useLoadQuestions(params) : true;

  if (state.mode === "conPreguntas" && !cargado) {
    return <div>Cargando preguntas...</div>;
  }

  return (
    <>
      <div>
        {state.teams.map((team, index) => (
          <Typography key={index} variant="h5">
            <strong>{team.name}:</strong> Puntaje: {team.score}
          </Typography>
        ))}
        <Typography variant="h5">
          Turno de: <strong>{state.currentTeam?.name}</strong>
        </Typography>
        <Typography variant="h6">
          Modo:{" "}
          <strong>
            {state.mode === "conPreguntas" ? "Con preguntas" : "Sin preguntas"}
          </strong>
        </Typography>
      </div>
      <GameBoard />
    </>
  );
};

export default GameContent;
