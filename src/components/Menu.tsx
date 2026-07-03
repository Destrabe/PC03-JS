import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu() {
  return (
    <nav className="menu">
      <div className="menu-brand">Gestor de Tareas</div>
      <ul className="menu-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Listado
          </NavLink>
        </li>
        <li>
          <NavLink to="/create" className={({ isActive }) => (isActive ? "active" : "")}>
            Crear tarea
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
