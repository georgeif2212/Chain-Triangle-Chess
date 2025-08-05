import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/">
        <button>Volver al inicio</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
