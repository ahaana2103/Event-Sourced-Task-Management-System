const express = require("express");
const router = express.Router();
const taskService = require("../Services/taskservice");

// Create
router.post("/create", (req, res) => {
  const { taskId, title } = req.body;
  try {
    const event = taskService.createTask(taskId, title);
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update
router.put("/update", (req, res) => {
  const { taskId, title } = req.body;
  try {
    const event = taskService.updateTask(taskId, title);
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Complete
router.put("/complete", (req, res) => {
  const { taskId } = req.body;
  try {
    const event = taskService.completeTask(taskId);
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tasks
router.get("/", (req, res) => {
  const tasks = taskService.getAllTasks();
  res.json(tasks);
});

module.exports = router;