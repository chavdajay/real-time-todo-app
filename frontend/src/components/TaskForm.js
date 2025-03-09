import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAxiosTask,
  updateAxiosTask,
  setTodo,
  addTaskSocket,
  updateTaskSocket,
} from "../features/taskSlice";
import socket from "../socket";

const TaskForm = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.tasks.todo);

  useEffect(() => {
    
    socket.off("taskAdded").on("taskAdded", (task) => {
      dispatch(addTaskSocket(task)); // Directly update Redux store
    });

    socket.off("taskUpdated").on("taskUpdated", (task) => {
      dispatch(updateTaskSocket(task)); // Directly update Redux store
    });

    return () => {
      socket.off("taskAdded");
      socket.off("taskUpdated");
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo.title.trim()) return;

    const newTask = { ...todo, status: "1" };
    dispatch(addAxiosTask(newTask)); //  trigger backend, socket
    dispatch(setTodo({ title: "", status: "1" }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!todo.title.trim()) return;

    dispatch(updateAxiosTask(todo)); // trigger backen, socket
    dispatch(setTodo({ title: "", status: "1" }));
  };

  return (
    <form
      onSubmit={todo?._id ? handleUpdate : handleSubmit}
      className="flex gap-2"
    >
      <input
        type="text"
        value={todo?.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        className="border p-2"
      />

      {todo?._id && (
        <select
          value={todo.status}
          onChange={(e) =>
            dispatch(setTodo({ ...todo, status: e.target.value }))
          }
        >
          <option value="1">Pending</option>
          <option value="2">Completed</option>
        </select>
      )}

      <button type="submit" className="bg-blue-500 text-white px-4">
        {todo?._id ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TaskForm;
