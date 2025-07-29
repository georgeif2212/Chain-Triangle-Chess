import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

const QuestionDialog = ({
  open,
  question,
  options,
  correctAnswer,
  onCorrect,
  onIncorrect,
  onClose,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (open) setShowAnswer(false);
  }, [open]);

  const handleOptionClick = (selected) => {
    if (selected === correctAnswer) {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          return;
        }
        onClose();
      }}
    >
      <DialogTitle>Pregunta</DialogTitle>
      <DialogContent>
        <Typography>{question}</Typography>

        {options?.length > 0 ? (
          // Pregunta de opción múltiple
          options.map((opt, i) => (
            <Button key={i} onClick={() => handleOptionClick(opt)}>
              {opt}
            </Button>
          ))
        ) : (
          // Pregunta abierta
          <>
            <Button onClick={() => setShowAnswer(true)}>
              Mostrar respuesta
            </Button>

            {showAnswer && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Respuesta: {correctAnswer}
              </Typography>
            )}

            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={onCorrect}>Respondí bien</Button>
              <Button onClick={onIncorrect}>Respondí mal</Button>
            </DialogActions>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuestionDialog;
