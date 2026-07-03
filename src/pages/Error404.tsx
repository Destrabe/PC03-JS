import { Link } from "react-router-dom";
import "./Error404.css";

function Error404() {
  return (
    <div className="error-404">
      <h1>404</h1>
      <p>La ruta solicitada no existe uu</p>
      <Link className="btn btn-home" to="/">
        Volver al listado
      </Link>
    </div>
  );
}

export default Error404;
