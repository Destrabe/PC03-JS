import { type FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, getTaskById, updateTask } from "../services/taskService";
import type { TaskInput, TaskStatus } from "../model/Task";
import "./TaskForm.css";

interface FormErrors {
  title?: string;
  description?: string;
}

const initialForm: TaskInput = {
  title: "",
  description: "",
  status: "pending",
};

function TaskForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState<TaskInput>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditMode || !id) return;

    const fetchTask = async () => {
      try {
        setLoading(true);
        const task = await getTaskById(id);
        setForm({
          title: task.title,
          description: task.description,
          status: task.status,
        });
        setLoadError(null);
      } catch (err) {
        console.error(err);
        setLoadError("No se pudo cargar la tarea a editar.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, isEditMode]);

  const validate = (values: TaskInput): FormErrors => {
    const newErrors: FormErrors = {};

    if (!values.title.trim()) {
      newErrors.title = "El título es obligatorio.";
    }
    if (!values.description.trim()) {
      newErrors.description = "La descripción es obligatoria.";
    }

    return newErrors;
  };

  const handleChange =
    (field: keyof TaskInput) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const value = e.target.value;
      setForm((prev) => ({
        ...prev,
        [field]: field === "status" ? (value as TaskStatus) : value,
      }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const payload: TaskInput = {
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
    };

    try {
      setSubmitting(true);
      if (isEditMode && id) {
        await updateTask(id, payload);
      } else {
        await createTask(payload);
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al guardar la tarea.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="info-message">Cargando formulario...</p>;
  if (loadError) return <p className="error-message">{loadError}</p>;

  return (
    <div className="task-form-page">
      <h1>{isEditMode ? "Editar tarea" : "Crear tarea"}</h1>

      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={handleChange("title")}
            className={errors.title ? "input-error" : ""}
          />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={handleChange("description")}
            className={errors.description ? "input-error" : ""}
          />
          {errors.description && (
            <span className="field-error">{errors.description}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="status">Estado</label>
          <select
            id="status"
            value={form.status}
            onChange={handleChange("status")}
          >
            <option value="pending">Pendiente</option>
            <option value="done">Completada</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-submit"
            disabled={submitting}
          >
            {submitting
              ? "Guardando..."
              : isEditMode
                ? "Guardar cambios"
                : "Crear tarea"}
          </button>
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
