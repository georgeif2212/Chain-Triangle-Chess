import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import TeamListContainer from "../components/TeamListContainer.jsx";
import useOptions from "../hooks/useOptions.jsx";
import "../styles/pages/Options.css";

const Options = () => {
  const {
    gameMode,
    teams,
    handleGameModeChange,
    handleTeamChange,
    handleAddTeam,
    handleRemoveTeam,
    handleRandomizeOrder,
    handleStartGame,
  } = useOptions();

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

        <TeamListContainer teams={teams} onTeamChange={handleTeamChange} />

        <div className="options-card-teamButtons">
          <Button onClick={handleAddTeam} disabled={teams.length >= 4} variant="contained">
            +
          </Button>
          <Button onClick={handleRemoveTeam} disabled={teams.length <= 2} variant="contained" color="error">
            -
          </Button>
        </div>

        <div className="order-buttons">
          <Button onClick={handleRandomizeOrder} variant="contained" color="secondary">
            Orden aleatorio
          </Button>
        </div>

        <Button onClick={handleStartGame} className="start-btn" variant="contained" color="success">
          Jugar
        </Button>
      </Card>
    </div>
  );
};

export default Options;
