const Task = require("../models/Task");

let io;
exports.initSocket = (socketIo) => {
  io = socketIo;

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

exports.addTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();

    io.emit("taskAdded", task); // Emit to all clients
    res.status(200).json({ task });
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ msg: "Server error", err });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ msg: "Task not found" });
    io.emit("taskUpdated", task); // Broadcast event
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });
    io.emit("taskDeleted", req.params.id); // Broadcast event
    res.status(200).json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};
