import { Link } from "react-router-dom";
import type { Task } from "../models/Task";
import "./TaskList.css";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
}

function TaskList({ tasks, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="empty-message">No hay tareas registradas.</p>;
  }

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>
              <span className={`badge ${task.status === "done" ? "badge-done" : "badge-pending"}`}>
                {task.status === "done" ? "Completada" : "Pendiente"}
              </span>
            </td>
            <td className="actions">
              <Link className="btn btn-view" to={`/tasks/${task.id}`}>
                Ver detalle
              </Link>
              <Link className="btn btn-edit" to={`/edit/${task.id}`}>
                Editar
              </Link>
              <button className="btn btn-delete" onClick={() => onDelete(task.id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
