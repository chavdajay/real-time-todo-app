import React from "react";
import { useDispatch } from "react-redux";
import { deleteAxiosTask, setTodo } from "../features/taskSlice";

const Table = ({ todoList }) => {
  const dispatch = useDispatch();

  const handleEdit = (task) => {
      dispatch(setTodo(task));
    };

  return (
    <div>
      {" "}
      {todoList?.length === 0 ? (
        <p>No Tasks Available...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((task, index) => (
              <tr key={task._id} className="border border-gray-300">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{task?.title}</td>
                <td className="p-2">{task?.status === "1" ? "Pending": "Completed"}</td>
                <td className="p-2">
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => handleEdit(task)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => dispatch(deleteAxiosTask(task._id))}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
