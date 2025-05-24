import { useContext, useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import { GameContext } from "../../../contexts/GameContext.jsx";
import GameBoard from "../components/Gameboard.jsx";
import GameHasFinished from "./GameHasFinished.jsx";
import GameHasNotStarted from "./GameHasNotStarted.jsx";
import QuestionLogicProvider from "../services/QuestionLogicProvider.jsx";
import "../styles/pages/Game.css";

const Game = () => {
  const { state, dispatch } = useContext(GameContext);

  console.log(state);
  const [params, setParams] = useState({
    mode: null,
    materia: null,
    tema: null,
    token: null,
  });
  // console.log("TODO: ",params.mode,params.materia,params.tema,params.token);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const mode = searchParams.get("mode");
    const materia = searchParams.get("materia");
    const tema = searchParams.get("tema");
    const token = searchParams.get("token");

    if (mode === "conPreguntas" && materia && tema && token) {
      setParams({ mode, materia, tema, token });

      // Iniciar automáticamente el juego si viene por URL
      if (state.gameState === "notStarted") {
        dispatch({ type: "START_GAME" });
      }
    }
  }, [dispatch, state.gameState]);

  const GameContent = () => {
    const { state } = useContext(GameContext);
  
    return (
      <>
        {params.mode === "conPreguntas" && (
          <QuestionLogicProvider
            materia={params.materia}
            tema={params.tema}
            token={params.token}
          />
        )}
        <div>
          {state.teams.map((team, index) => (
            <Typography key={index} variant="h5">
              <strong>{team.name}:</strong> Puntaje: {team.score}
            </Typography>
          ))}
          <Typography variant="h5">
            Turno de: <strong>{state.currentTeam.name}</strong>
          </Typography>
        </div>
        <GameBoard />
      </>
    );
  };
  

  return (
    <Container className="game-container">
      <Typography variant="h3">Triangle Chess!</Typography>
      {state.gameState === "notStarted" && <GameHasNotStarted />}
      {state.gameState === "started" && GameContent()}
      {state.gameState === "finished" && <GameHasFinished state={state} />}
    </Container>
  );
};

export default Game;
