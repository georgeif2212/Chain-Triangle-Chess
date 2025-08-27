import { useContext } from "react";
import { Container } from "@mui/material";
import GameContent from "./GameContent.jsx";
import GameHeader from "@components/layout/GameHeader.jsx";
import Footer from "@components/layout/Footer.jsx";
import { GameContext } from "@contexts/GameContext.jsx";
import "@styles/pages/Game.css";

const Game = () => {
  const { state } = useContext(GameContext);

  const usuario = state.vaepData?.user?.email || "Sin usuario";
  const materia = state.vaepData?.materiaNombre || "Sin materia";
  const tema = state.vaepData?.temaNombre || "Sin tema";

  return (
    <>
      <GameHeader
        usuario={usuario}
        materia={materia}
        tema={tema}
        onBack={() => navigate("/dashboard")}
      />
      ;
      <Container className="game-container">
        <GameContent />
      </Container>
      <Footer />
    </>
  );
};

export default Game;
