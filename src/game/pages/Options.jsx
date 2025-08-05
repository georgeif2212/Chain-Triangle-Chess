import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react"
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TeamListContainer from "@components/layout/TeamListContainer.jsx";
import CustomButton from "@components/ui/CustomButton.jsx";
import useOptions from "@hooks/useOptions.jsx";
import { formatMode } from "@utils/utils.js";
import styles from "@styles/pages/Options.module.css";

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
    <div className={styles.optionsContainer}>
      <div className={styles.optionsCard}>
        <Typography variant="h4" className={styles.title}>
          Opciones del Juego
        </Typography>

        <div className={styles.gameMode}>
          <Typography variant="body1">Modo: {formatMode(gameMode)}</Typography>
        </div>

        <TeamListContainer teams={teams} onTeamChange={handleTeamChange} />

        <div className={styles.teamButtons}>
          <Button
            onClick={handleAddTeam}
            disabled={teams.length >= 4}
            variant="contained"
            className={styles.button}
          >
            +
          </Button>
          <Button
            onClick={handleRemoveTeam}
            disabled={teams.length <= 2}
            variant="contained"
            color="error"
            className={styles.button}
          >
            -
          </Button>
        </div>

        <div className={styles.orderButtons}>
          <CustomButton
            text="Orden aleatorio"
            variant="secondary"
            onClick={handleRandomizeOrder}
          />
        </div>

        <CustomButton
          text="Jugar"
          variant="primary"
          onClick={() => navigate(`/game${location.search}`)}
        />
      </div>
    </div>
  );
};

export default Options;
