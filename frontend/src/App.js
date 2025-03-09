import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">To-Do App</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;
