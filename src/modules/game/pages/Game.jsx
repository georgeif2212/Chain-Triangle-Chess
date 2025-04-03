import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Typography, Button, Container } from "@mui/material";
import { GameContext } from "../../../contexts/GameContext.jsx";
import GameBoard from "../components/Gameboard.jsx";
import "../styles/pages/Game.css";

const Game = () => {
  const { state, dispatch } = useContext(GameContext);
  const handleStartGame = () => {
    const updatedTeams = state.teams.map((team) => ({
      ...team,
      score: 0,
    }));

    dispatch({ type: "SET_TEAMS", payload: updatedTeams });
    dispatch({ type: "START_GAME" });
  };

  const renderGameNotStarted = () => {
    const navigate = useNavigate();
    return (
      <>
        <div>
          <p>
            <strong>Mode: </strong>
            {state.mode}
          </p>
          <p>Equipos: </p>
          {state.teams.map((team, index) => (
            <p key={index}>
              <strong>Team {index + 1}: </strong>
              {team.name}
            </p>
          ))}
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/options")}
        >
          Configurar
        </Button>
        <Button variant="contained" color="primary" onClick={handleStartGame}>
          Comenzar juego
        </Button>
      </>
    );
  };

  const renderGameContent = () => (
    <>
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

  const renderGameHasFinished = () => {
    const sortedTeams = [...state.teams].sort((a, b) => b.score - a.score);

    return (
      <div className="game-summary">
        <Typography variant="h4">🎉 ¡El juego ha finalizado! 🎉</Typography>
        <Typography variant="h5">
          🏆 Ganador: <strong>{sortedTeams[0].name}</strong> con{" "}
          {sortedTeams[0].score} puntos
        </Typography>

        <Typography variant="h6">📊 Resultados finales:</Typography>
        <ul>
          {sortedTeams.map((team, index) => (
            <li key={team.name}>
              {index + 1}. {team.name} - {team.score} puntos
            </li>
          ))}
        </ul>

        <Button variant="contained" color="primary" onClick={resetGame}>
          Jugar de nuevo
        </Button>
      </div>
    );
  };

  return (
    <Container className="game-container ">
      <Typography variant="h3">Triangle Chess!</Typography>
      {!state.gameStarted ? renderGameNotStarted() : renderGameContent()}
    </Container>
  );
};

export default Game;
