import { useContext } from "react";
import { Container } from "@mui/material";
import GameContent from "./GameContent.jsx";
import GameHeader from "@components/layout/GameHeader.jsx";
import Footer from "@components/layout/Footer.jsx"
import { GameContext } from "@contexts/GameContext.jsx";
import "@styles/pages/Game.css";

const Game = () => {
  const { state } = useContext(GameContext);
  console.log("STATE:", state.vaepData);
  return (
    <>
      <GameHeader
        usuario={state.vaepData?.user.email ?? "Sin usuario"}
        materia={state.vaepData?.materiaNombre ?? "Sin materia"}
        tema={state.vaepData?.temaNombre ?? "Sin tema"}
        onBack={() => navigate("/dashboard")}
      />

      <Container className="game-container">
        <GameContent />
      </Container>
      <Footer/>
    </>
  );
};

export default Game;
