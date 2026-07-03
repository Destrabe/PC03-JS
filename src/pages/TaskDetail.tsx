import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTaskById } from "../services/taskService";
import type { Task } from "../models/Task";
import "./TaskDetail.css";

function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        setLoading(true);
        const data = await getTaskById(id);
        setTask(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("No se encontró la tarea solicitada.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <p className="info-message">Cargando detalle...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!task) return null;

  return (
    <div className="task-detail">
      <h1>Detalle de la tarea</h1>

      <div className="detail-card">
        <div className="detail-row">
          <span className="detail-label">Título</span>
          <span className="detail-value">{task.title}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Descripción</span>
          <span className="detail-value">{task.description}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Estado</span>
          <span className={`badge ${task.status === "done" ? "badge-done" : "badge-pending"}`}>
            {task.status === "done" ? "Completada" : "Pendiente"}
          </span>
        </div>
      </div>

      <div className="detail-actions">
        <Link className="btn btn-edit" to={`/edit/${task.id}`}>
          Editar
        </Link>
        <button className="btn btn-back" onClick={() => navigate("/")}>
          Volver
        </button>
      </div>
    </div>
  );
}

export default TaskDetail;
