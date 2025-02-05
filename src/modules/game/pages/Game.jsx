import GameController from "../components/GameController.jsx";
import Container from "react-bootstrap/Container";
import "../styles/pages/Game.css"; 

const Game = () => {
  return (
    <Container className="game-container">
      <h1>Bienvenido al juego</h1>
      <GameController />
    </Container>
  );
};  

export default Game;
