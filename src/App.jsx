import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Home from "@pages/Home.jsx";
import Game from "@pages/Game.jsx";
import Options from "@pages/Options.jsx";
import Error from "@pages/Error.jsx";
import GameHeader from "@components/layout/GameHeader";
import Footer from "@components/layout/Footer.jsx";
import { GameContext } from "@contexts/GameContext.jsx";
function App() {
  const { state } = useContext(GameContext);
  const usuario = state.vaepData?.user?.email || "Sin usuario";
  const materia = state.vaepData?.materiaNombre || "Sin materia";
  const tema = state.vaepData?.temaNombre || "Sin tema";

  return (
    <Router>
      <GameHeader usuario={usuario} materia={materia} tema={tema} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/options" element={<Options />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
