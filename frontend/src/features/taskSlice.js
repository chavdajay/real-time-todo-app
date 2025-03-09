import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasks: [],
  todo: { title: "", status: "1" },
};

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchAxiosTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const response = await axios.get(`${BASE_URL}/tasks`);
    return response.data?.tasks;
  }
);

export const addAxiosTask = createAsyncThunk("tasks/addTask", async (task) => {
  const response = await axios.post(`${BASE_URL}/tasks`, task);
  return response.data.task;
});

export const updateAxiosTask = createAsyncThunk(
  "tasks/updateTask",
  async (task) => {
    await axios.put(`${BASE_URL}/tasks/${task._id}`, task);
    return task;
  }
);

export const deleteAxiosTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    await axios.delete(`${BASE_URL}/tasks/${taskId}`);
    return taskId;
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = Array.isArray(action.payload) ? action.payload : [];
    },
    setTodo: (state, action) => {
      state.todo = action.payload;
    },
    addTaskSocket: (state, action) => {
      console.log("addTaskSocket", state, action);

      state.tasks.push(action.payload); // Add task in real-time
    },
    updateTaskSocket: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    },
    deleteTaskSocket: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAxiosTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addAxiosTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload); // Ensure Redux gets updated
      })
      .addCase(updateAxiosTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(deleteAxiosTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export const {
  setTasks,
  setTodo,
  addTaskSocket,
  updateTaskSocket,
  deleteTaskSocket,
} = taskSlice.actions;
export default taskSlice.reducer;
