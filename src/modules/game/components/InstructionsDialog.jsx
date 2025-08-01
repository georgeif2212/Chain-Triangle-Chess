// components/InstructionsDialog.jsx
import React from 'react';
import styles from '../styles/components/InstructionsDialog.module.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

const InstructionsDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Instrucciones del Juego</DialogTitle>
      <DialogContent className={styles.content}>
        <Typography gutterBottom>
          <strong>Desarrollo del juego:</strong> cada equipo coloca líneas rectas sobre el tablero
          con el objetivo de formar triángulos. Cada vez que un equipo completa un triángulo, este
          se colorea con su color. El objetivo es formar la mayor cantidad de triángulos posibles,
          respetando las reglas. Cada equipo tiene un turno para responder una pregunta asignada por
          el sistema. Comienza el equipo rojo, luego el azul, después el verde y finalmente el
          amarillo. En caso de respuesta incorrecta, no se dibuja la línea y el turno pasa al
          siguiente equipo.
        </Typography>
        <Typography gutterBottom>
          <strong>Reglas para el trazado de líneas:</strong>
          <ol>
            <li>Debe ser recta y abarcar exactamente tres postes.</li>
            <li>Ha de compartir al menos uno de sus postes con una línea ya trazada.</li>
            <li>No puede superponerse completamente a ninguna línea existente.</li>
          </ol>
        </Typography>
        <Typography>
          <strong>Condiciones de victoria:</strong> El juego concluye cuando todas las casillas del
          tablero han sido coloreadas. El equipo que haya formado la mayor cantidad de triángulos es
          declarado ganador; en caso de empate, ambos equipos comparten la victoria.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InstructionsDialog;
