import { useState } from "react";
import { Card, CardContent, CardHeader, Typography, IconButton, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Options = () => {
  const [gameMode, setGameMode] = useState("Con preguntas");
  const gameModes = ["Con preguntas", "Sin preguntas"];

  const [teamNames, setTeamNames] = useState([
    "Nombre 1",
    "Nombre 2",
    "Nombre 3",
    "Nombre 4",
  ]);

  const handleGameModeChange = (direction) => {
    const currentIndex = gameModes.indexOf(gameMode);
    const nextIndex = (currentIndex + direction + gameModes.length) % gameModes.length;
    setGameMode(gameModes[nextIndex]);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Card sx={{ width: 400, padding: 2, boxShadow: 3 }}>
        <CardHeader
          title={<Typography variant="h6" align="center">Opciones</Typography>}
        />
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <Typography variant="subtitle1" fontWeight="bold">Modo de juego:</Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => handleGameModeChange(-1)}>
                <ChevronLeft />
              </IconButton>
              <Typography variant="body1" style={{ margin: "0 8px" }}>{gameMode}</Typography>
              <IconButton onClick={() => handleGameModeChange(1)}>
                <ChevronRight />
              </IconButton>
            </div>
          </div>

          <div>
            {teamNames.map((name, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <Typography variant="subtitle1" fontWeight="bold">Equipo {index + 1}:</Typography>
                <Typography variant="body1">{name}</Typography>
                <AccountCircleIcon fontSize="large" />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
            <Button variant="contained" color="primary">Jugar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Options;
