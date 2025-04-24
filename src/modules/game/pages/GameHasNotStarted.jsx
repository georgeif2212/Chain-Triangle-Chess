import { useNavigate } from "react-router-dom";
import { GameContext } from "../../../contexts/GameContext.jsx";
import { useContext } from "react";
import { Button } from "@mui/material";

const GameHasNotStarted = () => {
  const {state, dispatch}=useContext(GameContext)
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

export default GameHasNotStarted;
