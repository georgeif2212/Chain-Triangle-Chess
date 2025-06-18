import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import TeamListContainer from "../components/TeamListContainer.jsx";
import useOptions from "../hooks/useOptions.jsx";
import "../styles/pages/Options.css";
import { formatMode } from "../../../utils/utils.js";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Options = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtener parámetros de la URL
  const searchParams = new URLSearchParams(location.search);
  const gameMode = searchParams.get("mode") || "sinPreguntas";
  const materia = searchParams.get("materia");
  const tema = searchParams.get("tema");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!["conPreguntas", "sinPreguntas"].includes(gameMode)) {
      console.warn("Modo inválido, redirigiendo...");
      navigate("/error");
    }
  }, [gameMode]);

  const {
    teams,
    handleTeamChange,
    handleAddTeam,
    handleRemoveTeam,
    handleRandomizeOrder,
    handleOptionsStartGame,
  } = useOptions();

  return (
    <div className="options-container">
      <Card className="options-card">
        <Typography variant="h5" className="options-card__title">
          Opciones del Juego
        </Typography>

        <div className="options-card-gameMode">
          <Typography>Modo: {formatMode(gameMode)}</Typography>
        </div>

        <TeamListContainer teams={teams} onTeamChange={handleTeamChange} />

        <div className="options-card-teamButtons">
          <Button
            onClick={handleAddTeam}
            disabled={teams.length >= 4}
            variant="contained"
          >
            +
          </Button>
          <Button
            onClick={handleRemoveTeam}
            disabled={teams.length <= 2}
            variant="contained"
            color="error"
          >
            -
          </Button>
        </div>

        <div className="order-buttons">
          <Button
            onClick={handleRandomizeOrder}
            variant="contained"
            color="secondary"
          >
            Orden aleatorio
          </Button>
        </div>

        <Button
          onClick={() => navigate(`/game/${location.search}`)}
          className="start-btn"
          variant="contained"
          color="success"
        >
          Jugar
        </Button>
      </Card>
    </div>
  );
};

export default Options;
