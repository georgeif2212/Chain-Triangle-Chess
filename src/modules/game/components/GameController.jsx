import { useContext } from "react";
import { GameContext } from "../../../contexts/GameContext.jsx";
import GameBoard from "./Gameboard.jsx";

const   GameController = () => {
  const { state, dispatch } = useContext(GameContext);
  console.log(state);
  const handleNextTeam = () => {
    dispatch({ type: "NEXT_TEAM" });
  };

  return (
    <>
      <h2>Current Team: </h2>
      <GameBoard currentTeam={state.currentTeam} onNextTeam={handleNextTeam} />
    </>
  );
};

export default GameController;
