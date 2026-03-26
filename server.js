const express = require("express");
const path = require("path");
const cors=require("cors");
const taskRoutes = require("./routes/taskRoutes");
const replay = require("./utils/replay"); 
const { logEvent } = require("./utils/logger"); 

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

// Mount Task API routes (no auth for now)
app.use("/tasks", taskRoutes);

app.get("/rebuild", (req, res) => {
  try {
    const state = replay();
    logEvent({ message: "State rebuilt from events", state });
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});