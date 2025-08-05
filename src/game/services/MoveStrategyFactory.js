import ClassicMoveStrategy from "./strategies/ClassicMoveStrategy";
import QuestionMoveStrategy from "./strategies/QuestionMoveStrategy";

export const getMoveStrategy = (mode, strategyProps) => {
  switch (mode) {
    case "conPreguntas":
      return new QuestionMoveStrategy(strategyProps);
    case "sinPreguntas":
    default:
      return new ClassicMoveStrategy(strategyProps);
  }
};
