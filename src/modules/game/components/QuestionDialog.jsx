import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";

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

  const handleOptionClick = (selected) => {
    if (selected === correctAnswer) {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Pregunta</DialogTitle>
      <DialogContent>
        <Typography>{question}</Typography>
        {options?.length > 0 ? (
          options.map((opt, i) => (
            <Button key={i} onClick={() => handleOptionClick(opt)}>
              {opt}
            </Button>
          ))
        ) : (
          <>
            {!showAnswer ? (
              <Button onClick={() => setShowAnswer(true)}>
                Mostrar respuesta
              </Button>
            ) : (
              <Typography variant="body2">
                Respuesta: {correctAnswer}
              </Typography>
            )}
          </>
        )}
      </DialogContent>
      {!options?.length && showAnswer && (
        <DialogActions>
          <Button onClick={onCorrect}>Respondí bien</Button>
          <Button onClick={onIncorrect}>Respondí mal</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default QuestionDialog;
