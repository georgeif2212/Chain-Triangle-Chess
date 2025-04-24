import { Snackbar, Alert, AlertTitle } from "@mui/material";

const InvalidMoveAlert = ({ open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert variant="filled" onClose={onClose} severity="error" style={{ width: "100%" }}>
        <AlertTitle>Movimiento inválido</AlertTitle>
        Intenta con otra conexión.
      </Alert>
    </Snackbar>
  );
};

export default InvalidMoveAlert;
