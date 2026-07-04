// Modelo de la entidad Task (tarea)

export type TaskStatus = "pending" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

// Tipo usado para crear/editar una tarea (sin id, lo genera json-server)
export type TaskInput = Omit<Task, "id">;
