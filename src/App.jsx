import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./modules/game/pages/Home.jsx";
import Game from "./modules/game/pages/Game.jsx";
import Options from "./modules/game/pages/Options.jsx";
import Questions from "./modules/game/pages/Questions.jsx";
import Error from "./modules/game/pages/Error.jsx";
// import Register from "./modules/auth/pages/Register.jsx";
// import Login from "./modules/auth/pages/Login.jsx";
import AuthMiddleware from "./middlewares/Authmiddleware.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/options" element={<Options />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
