import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import Game from "@pages/Game.jsx";
import Options from "@pages/Options.jsx";
import GameHeader from "@components/layout/GameHeader";
import Footer from "@components/layout/Footer.jsx";
import { GameContext } from "@contexts/GameContext.jsx";
import { Container } from "@mui/material";

function App() {
  const { state } = useContext(GameContext);
  const usuario = state.vaepData?.user?.email || null;
  const materia = state.vaepData?.materiaNombre || null;
  const tema = state.vaepData?.temaNombre || null;

  return (
    <Router basename="/trianglechess">
      <div className="app">
        <GameHeader usuario={usuario} materia={materia} tema={tema} />
        <Container className="general-container">
          <Routes>
            <Route path="/" element={<Navigate to="/game" replace />} />
            <Route path="/options" element={<Options />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<Navigate to="/game" replace />} />
          </Routes>
        </Container>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
