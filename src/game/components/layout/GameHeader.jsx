import { useState } from "react";
import styles from "@styles/components/layout/GameHeader.module.css";
import InstructionsDialog from "../dialogs/InstructionsDialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography } from "@mui/material";

import logoUAM from "@assets/logoUAM.png";

const GameHeader = ({ usuario, materia, tema }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <img src={logoUAM} alt="UAM" className={styles.logo} />
      </div>

      <div className={styles.titleSection}>
        <Typography variant="h5" sx={{ fontWeight: "900" }}>
          Triangle Chess!
        </Typography>
        {(usuario || materia || tema) && (
          <div className={styles.details}>
            {usuario && <span>Usuario: {usuario} </span>}
            {materia && <span>Materia: {materia} </span>}
            {tema && <span>Tema: {tema}</span>}
          </div>
        )}
      </div>

      <div className={styles.buttonSection}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#26355D" }}
          onClick={() => setOpen(true)}
        >
          Instrucciones
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#26355D" }}
          onClick={() =>
            (window.location.href = "http://148.206.168.145/vaep/")
          }
          startIcon={<ArrowBackIcon />}
        >
          Regresar
        </Button>
      </div>

      <InstructionsDialog open={open} onClose={() => setOpen(false)} />
    </header>
  );
};

export default GameHeader;
