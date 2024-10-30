import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import  Home  from "./pages/Home.jsx";
import  Gameboard from "./components/Gameboard.jsx";
import Error from "./pages/Error.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Gameboard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
