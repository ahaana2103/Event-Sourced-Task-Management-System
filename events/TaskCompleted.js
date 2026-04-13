const generateId = require("../utils/generateId");

module.exports = function TaskCompleted(taskId) {
  const now = new Date();
  return {
    eventId: generateId(),
    aggregateId: taskId,
    eventType: "TaskCompleted",
    payload: {
      completed: true
    },
    timestamp: now.toISOString()
  };
};
