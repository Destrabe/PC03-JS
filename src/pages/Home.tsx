import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import { deleteTask, getTasks } from "../services/taskService";
import type { Task } from "../model/Task";
import "./Home.css";

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(
        "No se pudieron cargar las tareas. Verifica que json-server esté activo.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "¿Seguro que deseas eliminar esta tarea? Esta acción no se puede deshacer.",
    );
    if (!confirmed) return;

    try {
      await deleteTask(id);
      // Actualiza la UI sin recargar la página
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al eliminar la tarea.");
    }
  };

  return (
    <div className="home-page">
      <h1>Listado de tareas</h1>

      {loading && <p className="info-message">Cargando tareas...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && <TaskList tasks={tasks} onDelete={handleDelete} />}
    </div>
  );
}

export default Home;
