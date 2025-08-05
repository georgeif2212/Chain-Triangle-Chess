import { useState } from "react";
import styles from "@styles/components/layout/GameHeader.module.css";
import InstructionsDialog from "../dialogs/InstructionsDialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import logoUAM from "@assets/logoUAM.png";

const GameHeader = ({ usuario, materia, tema, onBack }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <img src={logoUAM} alt="UAM" className={styles.logo} />
      </div>

      <div className={styles.titleSection}>
        <h2>Triangle chess</h2>
        <div className={styles.details}>
          <span>Usuario: {usuario} </span>
          <span>Materia: {materia} </span>
          <span>Tema: {tema}</span>
        </div>
      </div>

      <div className={styles.buttonSection}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          INSTRUCCIONES
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            (window.location.href = "https://vaep-uamc.web.app/console")
          }
          startIcon={<ArrowBackIcon />}
        >
          REGRESAR
        </Button>
      </div>

      <InstructionsDialog open={open} onClose={() => setOpen(false)} />
    </header>
  );
};

export default GameHeader;
