import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAxiosTasks, deleteTaskSocket } from "../features/taskSlice";
import socket from "../socket";
import Table from "./Table";

const TaskList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchAxiosTasks());

    const handleTaskDeleted = (taskId) => {
      dispatch(deleteTaskSocket(taskId));
    };

    socket
      .off("taskDeleted", handleTaskDeleted)
      .on("taskDeleted", handleTaskDeleted);

    return () => {
      socket.off("taskDeleted", handleTaskDeleted);
    };
  }, [dispatch]);
  const groupedTasks = {
    pending: todoList.filter((task) => {
      console.log(task);
      return task.status === "1";
    }),
    completed: todoList.filter((task) => {
      return task.status === "2";
    }),
  };
  console.log("TododApp", Object.entries(groupedTasks));
  return (
    <div>
      <h2 className="text-xl font-bold">Tasks</h2>
      {Object.entries(groupedTasks).map(([status, tasks]) => (
        <details
          key={status}
          className="mb-2 border border-gray-300 rounded p-2"
        >
          <summary className="cursor-pointer font-semibold capitalize">
            {status} ({tasks.length})
          </summary>
          <ul className="ml-4 mt-2">
            {tasks.length === 0 ? (
              <li className="text-gray-500">No tasks available...</li>
            ) : (
              <li className="border-b p-2 flex justify-between items-center">
                <Table todoList={tasks} />
              </li>
            )}
          </ul>
        </details>
      ))}
    </div>
  );
};

export default TaskList;
