import { useContext, useState } from "react";
import { GameContext } from "../../../contexts/GameContext.jsx";
import {
  Card,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import "../styles/pages/Options.css";

const colors = ["#EF4B4B", "#7BD3EA", "#A5DD9B", "#FFD966"];

const Options = () => {
  const { state, dispatch } = useContext(GameContext);
  const [gameMode, setGameMode] = useState(state.mode);
  const [teams, setTeams] = useState(state.teams.slice(0, 2)); // Mínimo 2 equipos
  const [orderRandom, setOrderRandom] = useState(false);

  const handleGameModeChange = () => {
    setGameMode((prev) => (prev === "normal" ? "sin preguntas" : "normal"));
  };

  const handleTeamChange = (index, key, value) => {
    const updatedTeams = teams.map((team, i) =>
      i === index ? { ...team, [key]: value } : team
    );
    setTeams(updatedTeams);
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

        <div>
          <Typography variant="body1">Modo de juego:</Typography>
          <div className="options-card-gameMode ">
            <Button onClick={() => handleGameModeChange(-1)}>
              <ChevronLeft />
            </Button>
            <Typography>{gameMode}</Typography>
            <Button onClick={() => handleGameModeChange(1)}>
              <ChevronRight />
            </Button>
          </div>
        </div>

        {teams.map((team, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <TextField
              label={`Equipo ${index + 1}`}
              value={team.name}
              onChange={(e) => handleTeamChange(index, "name", e.target.value)}
              variant="outlined"
              size="small"
            />
            <FormControl size="small">
              <InputLabel>Color</InputLabel>
              <Select
                value={team.color}
                onChange={(e) =>
                  handleTeamChange(index, "color", e.target.value)
                }>
                {colors.map((color) => (
                  <MenuItem
                    key={color}
                    value={color}
                    disabled={teams.some((t) => t.color === color)}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: color,
                        borderRadius: "50%",
                      }}></div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}

        <div className="team-buttons">
          <Button
            onClick={handleAddTeam}
            disabled={teams.length >= 4}
            variant="contained">
            + Agregar equipo
          </Button>
          <Button
            onClick={handleRemoveTeam}
            disabled={teams.length <= 2}
            variant="contained"
            color="error">
            - Quitar equipo
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
