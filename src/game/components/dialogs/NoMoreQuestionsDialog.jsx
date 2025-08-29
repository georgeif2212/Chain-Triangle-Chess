import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const NoMoreQuestionsDialog = ({ open, onContinue, onEnd }) => (
  <Dialog open={open} disableEscapeKeyDown onClose={() => {}}>
    <DialogTitle textAlign={"center"}>¡Preguntas agotadas!</DialogTitle>
    <DialogContent sx={{ display: "flex" }}>
      <Typography textAlign={"center"}>
        Ya no hay más preguntas disponibles. ¿Deseas continuar el juego sin
        preguntas o finalizarlo ahora?
      </Typography>
    </DialogContent>
    <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
      <Button onClick={onEnd} variant="outlined" color="error">
        Finalizar juego
      </Button>
      <Button onClick={onContinue} variant="outlined" color="success">
        Continuar sin preguntas
      </Button>
    </DialogActions>
  </Dialog>
);

export default NoMoreQuestionsDialog;
