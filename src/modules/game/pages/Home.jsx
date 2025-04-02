import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Typography variant="h3">Triangle Chess </Typography>
      <Link to="/game"><h1>Jugar</h1></Link>
      <Link to="/game"><h2>Opciones</h2></Link>      
      <h2>Salir</h2>
    </Container>
  );
};

export default Home;
