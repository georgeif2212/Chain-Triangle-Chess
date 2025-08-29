import CustomAlert from "@components/ui/Alert.jsx";
import QuestionDialog from "@components/dialogs/QuestionDialog.jsx";
import NoMoreQuestionsDialog from "@components/dialogs/NoMoreQuestionsDialog.jsx";

const BoardDialogs = ({
  questionData,
  setQuestionData,
  invalidMoveAlert,
  setInvalidMoveAlert,
  incorrectAnswerAlert,
  setIncorrectAnswerAlert,
  showNoMoreQuestionsDialog,
  setShowNoMoreQuestionsDialog,
  dispatch,
}) => {
  return (
    <>
      {/* Preguntas */}
      <QuestionDialog
        open={questionData.open}
        question={questionData.question}
        options={questionData.options}
        correctAnswer={questionData.correctAnswer}
        onCorrect={() => {
          questionData.onSuccess();
          setQuestionData((prev) => ({ ...prev, open: false }));
        }}
        onIncorrect={() => {
          questionData.onFail();
          setQuestionData((prev) => ({ ...prev, open: false }));
          setIncorrectAnswerAlert(true);
        }}
        onClose={() => setQuestionData((prev) => ({ ...prev, open: false }))}
      />

      {/* Alertas */}
      <CustomAlert
        open={Boolean(invalidMoveAlert)}
        onClose={() => setInvalidMoveAlert(null)}
        severity="warning"
        title="Movimiento inválido"
        message={invalidMoveAlert}
      />

      <CustomAlert
        open={incorrectAnswerAlert}
        onClose={() => setIncorrectAnswerAlert(false)}
        severity="error"
        title="Respuesta incorrecta"
        message="Fallaste la pregunta. Presta más atención la próxima vez."
      />

      {/* Diálogo: no hay más preguntas */}
      <NoMoreQuestionsDialog
        open={showNoMoreQuestionsDialog}
        onContinue={() => {
          dispatch({ type: "SET_MODE", payload: "sinPreguntas" });
          setShowNoMoreQuestionsDialog(false);
        }}
        onEnd={() => {
          dispatch({ type: "GAME_OVER" });
          setShowNoMoreQuestionsDialog(false);
        }}
      />
    </>
  );
};

export default BoardDialogs;
