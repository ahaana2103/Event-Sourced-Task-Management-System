const express = require("express");
const router = express.Router();
const taskStore = require("../Services/taskservice");

// Create Task
router.post("/create", async (req, res) => {
  try {
    const { taskId, title } = req.body;
    const task = await taskStore.createTask({ id: taskId, title });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update Task
router.put("/update",async (req, res) => {
  try {
    const { taskId, title } = req.body;
    const task = await taskStore.updateTask(taskId, title);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Complete Task
router.put("/complete", async (req, res) => {
  try {
    const { taskId } = req.body;
    const task = await taskStore.completeTask(taskId);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Task
router.put("/delete", async (req, res) => {
  try {
    const { taskId } = req.body;
    console.log("DELETE /tasks/delete called with taskId:", taskId);
    const task = await taskStore.deleteTask(taskId);
    console.log("Delete route response:", task);
    res.json(task);
  } catch (err) {
    console.error("Delete route error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await taskStore.deleteTask(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await taskStore.getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
