const express = require("express");
const router = express.Router();
const taskStore = require("../Services/taskservice");

// Create Task
router.post("/create", (req, res) => {
  const { taskId, title } = req.body;
  const task = taskStore.createTask({ id: taskId, title });
  res.json(task);
});

// Update Task
router.put("/update", (req, res) => {
  const { taskId, title } = req.body;
  const task = taskStore.updateTask(taskId, title);
  res.json(task);
});

// Complete Task
router.put("/complete", (req, res) => {
  const { taskId } = req.body;
  const task = taskStore.completeTask(taskId);
  res.json(task);
});

// Get all tasks
router.get("/", (req, res) => {
  const tasks = taskStore.getAllTasks();
  res.json(tasks);
});

module.exports = router;