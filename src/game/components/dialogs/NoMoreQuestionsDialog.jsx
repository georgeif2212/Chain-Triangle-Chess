import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const NoMoreQuestionsDialog = ({ open, onContinue, onEnd }) => (
  <Dialog open={open} disableEscapeKeyDown onClose={() => {}}>
    <DialogTitle>¡Preguntas agotadas!</DialogTitle>
    <DialogContent>
      <Typography>
        Ya no hay más preguntas disponibles. ¿Deseas continuar el juego sin
        preguntas o finalizarlo ahora?
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onEnd} color="error">
        Finalizar juego
      </Button>
      <Button onClick={onContinue} variant="contained" color="primary">
        Continuar sin preguntas
      </Button>
    </DialogActions>
  </Dialog>
);

export default NoMoreQuestionsDialog;
