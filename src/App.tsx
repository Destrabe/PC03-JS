import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import TaskDetail from "./pages/TaskDetail";
import TaskForm from "./pages/TaskForm";
import Error404 from "./pages/Error404";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/create" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskForm />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
