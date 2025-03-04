import GameController from "../components/GameController.jsx";
import "../styles/pages/Game.css"; 

const Game = () => {
  return (
    <div className="game-container">
      <h1>Bienvenido al juego</h1>
      <GameController />
    </div>
  );
};  

export default Game;
