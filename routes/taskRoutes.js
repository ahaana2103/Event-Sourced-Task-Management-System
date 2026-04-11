const express = require("express");
const router = express.Router();
const taskStore = require("../Services/taskservice");

// Create Task
router.post("/create",async (req, res) => {
  const { taskId, title } = req.body;
  const task = await taskStore.createTask({ id: taskId, title });
  res.json(task);
});

// Update Task
router.put("/update",async (req, res) => {
  const { taskId, title } = req.body;
  const task =await taskStore.updateTask(taskId, title);
  res.json(task);
});

// Complete Task
router.put("/complete", async (req, res) => {
  const { taskId } = req.body;
  const task = await taskStore.completeTask(taskId);
  res.json(task);
});

// Get all tasks
router.get("/", async (req, res) => {
  const tasks = await taskStore.getAllTasks();
  res.json(tasks);
});

module.exports = router;