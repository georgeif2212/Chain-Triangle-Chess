import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./modules/game/pages/Home.jsx";
import Game from "./modules/game/pages/Game.jsx";
import Options from "./modules/game/pages/Options.jsx";
import Error from "./modules/game/pages/Error.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/options" element={<Options />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
