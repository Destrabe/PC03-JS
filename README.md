# Gestor de Tareas — React + TypeScript + json-server

## Estructura 

src/
  models/
    Task.ts          -> interfaz Task y TaskInput
  services/
    taskService.ts    -> getTasks, getTaskById, createTask, updateTask, deleteTask (axios)
  components/
    Menu.tsx / .css   -> navegación, incrustado en App.tsx
    TaskList.tsx / .css -> tabla de tareas (listado), usada en Home
  pages/
    Home.tsx / .css      -> ruta "/" y "/home"
    TaskDetail.tsx / .css -> ruta "/tasks/:id"
    TaskForm.tsx / .css   -> rutas "/create" y "/edit/:id"
    Error404.tsx / .css   -> ruta comodín "*"
  App.tsx / .css     -> configuración de rutas (React Router v7) + Menu
  main.tsx           -> entry point
db.json              -> datos simulados para json-server (colección "tasks")


## Requisitos

- Node.js 18+
- npm

## Instalación

npm install

## Ejecutar el proyecto (API simulada + frontend)

Este comando levanta json-server (puerto 3001) y Vite (puerto 5173) al mismo tiempo:

npm start

O por separado, en dos terminales:

npm run server   # json-server --watch db.json --port 3001
npm run dev      # vite (http://localhost:5173)


## Rutas de la aplicación

| Ruta          | Componente  | Descripción                          |
|---------------|-------------|---------------------------------------|
| `/`, `/home`  | Home        | Listado de tareas                     |
| `/tasks/:id`  | TaskDetail  | Detalle de una tarea                  |
| `/create`     | TaskForm    | Crear nueva tarea                     |
| `/edit/:id`   | TaskForm    | Editar tarea existente                |
| `*`           | Error404    | Cualquier ruta no reconocida          |

## Endpoint de la API en local

`http://localhost:3001/tasks` (GET, GET/:id, POST, PUT/:id, DELETE/:id)


Para completar las evidencias que piden las consideraciones del enunciado, ejecuta
`npm start`, abre `http://localhost:5173` y toma capturas de:

1. Listado con tareas (`/`) y listado vacío (elimina todas las tareas temporalmente o
   vacía el arreglo `tasks` en `db.json` y reinicia json-server).
2. Cada ruta: `/`, `/home`, `/tasks/1` (o cualquier id existente), `/create`, `/edit/1`
   y una ruta inválida como `/ruta-no-existe` para ver el 404.
3. Detalle de una tarea (`/tasks/:id`) con los botones "Editar" y "Volver" funcionando.
4. Formulario de creación: inserta 2 tareas nuevas y verifica que aparezcan en el listado.
5. Formulario de edición: edita una de las tareas creadas y verifica el cambio en el listado.
6. Eliminación: borra 2 tareas (una por una), mostrando el cuadro de confirmación antes
   de cada eliminación y el listado actualizado sin recargar la página.
