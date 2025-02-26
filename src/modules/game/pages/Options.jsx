import { useContext, useState } from "react";
import { GameContext } from "../../../contexts/GameContext.jsx";
import {
  Card,
  Typography,
  Button,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import TeamSelector from "../components/TeamSelector.jsx";
import "../styles/pages/Options.css";

const Options = () => {
  const { state, dispatch } = useContext(GameContext);
  const [gameMode, setGameMode] = useState(state.mode);
  const [teams, setTeams] = useState(state.teams.slice(0, 2)); // Mínimo 2 equipos
  const [orderRandom, setOrderRandom] = useState(false);

  const handleGameModeChange = () => {
    setGameMode((prev) => (prev === "normal" ? "sin preguntas" : "normal"));
  };

  const handleTeamChange = (index, key, value) => {
    setTeams((prev) =>
      prev.map((team, i) => (i === index ? { ...team, [key]: value } : team))
    );
  };

  const handleAddTeam = () => {
    if (teams.length < 4) {
      setTeams([...teams, { name: `Equipo ${teams.length + 1}`, color: "" }]);
    }
  };

  const handleRemoveTeam = () => {
    if (teams.length > 2) {
      setTeams(teams.slice(0, -1));
    }
  };

  const handleRandomizeOrder = () => {
    setOrderRandom(true);
    setTeams([...teams].sort(() => Math.random() - 0.5));
  };

  const handleStartGame = () => {
    dispatch({ type: "SET_MODE", payload: gameMode });
    dispatch({ type: "SET_CURRENT_TEAM", payload: null });
    dispatch({ type: "SET_TEAMS", payload: orderRandom ? [...teams] : teams });
  };

  return (
    <div className="options-container">
      <Card className="options-card">
        <Typography variant="h5" className="options-card__title">
          Opciones del Juego
        </Typography>

        <div className="options-card-gameMode">
          <Button onClick={handleGameModeChange}>
            <ChevronLeft />
          </Button>
          <Typography>{gameMode}</Typography>
          <Button onClick={handleGameModeChange}>
            <ChevronRight />
          </Button>
        </div>

        {teams.map((team, index) => (
          <TeamSelector
            key={index}
            index={index}
            team={team}
            teams={teams}
            onTeamChange={handleTeamChange}
          />
        ))}

        <div className="team-buttons">
          <Button
            onClick={handleAddTeam}
            disabled={teams.length >= 4}
            variant="contained">
            +
          </Button>
          <Button
            onClick={handleRemoveTeam}
            disabled={teams.length <= 2}
            variant="contained"
            color="error">
            -
          </Button>
        </div>

        <div className="order-buttons">
          <Button
            onClick={handleRandomizeOrder}
            variant="contained"
            color="secondary">
            Orden aleatorio
          </Button>
        </div>

        <Button
          onClick={handleStartGame}
          className="start-btn"
          variant="contained"
          color="success">
          Jugar
        </Button>
      </Card>
    </div>
  );
};

export default Options;
