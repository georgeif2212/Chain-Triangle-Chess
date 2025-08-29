import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "@styles/components/dialogs/QuestionDialog.module.css";

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

  const letters = "abcdefghijklmnopqrstuvwxyz";

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") return;
        onClose();
      }}
      PaperProps={{
        sx: {
          backgroundColor: "#f9f5f2de",
          borderRadius: 2,
          minWidth: 300,
        },
      }}
    >
      <DialogTitle textAlign="center">{question}</DialogTitle>
      <DialogContent>
        {options?.length > 0 ? (
          <div className={styles.optionsColumn}>
            {options.map((opt, i) => (
              <Button
                key={i}
                fullWidth
                variant="outlined"
                onClick={() => handleOptionClick(opt)}
                sx={{
                  color: "#412305ff",
                  justifyContent: "flex-start",
                  marginBottom: 1,
                  textTransform: "none",
                  backgroundColor: "#e0dcd8",
                  borderColor: "#a18f7bff",
                  "&:hover": {
                    backgroundColor: "#d4b9a6ff",
                  },
                }}
              >
                {letters[i]}) {opt}
              </Button>
            ))}
          </div>
        ) : (
          <div className={styles.responsesBox}>
            <div className={styles.extra}>
              {!showAnswer && (
                <Button variant="outlined" onClick={() => setShowAnswer(true)}>
                  Mostrar respuesta
                </Button>
              )}
            </div>

            {showAnswer && (
              <Typography
                variant="body2"
                sx={{ mt: 1, mb: 2, textAlign: "center" }}
              >
                Respuesta: {correctAnswer}
              </Typography>
            )}

            <DialogActions
              className={styles.successErrorBox}
              sx={{ justifyContent: "space-around", marginTop: 1 }}
            >
              <Button color="success" variant="contained" onClick={onCorrect}>
                Correcto
              </Button>
              <Button color="error" variant="contained" onClick={onIncorrect}>
                Incorrecto
              </Button>
            </DialogActions>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuestionDialog;
