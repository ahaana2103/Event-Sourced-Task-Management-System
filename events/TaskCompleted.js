const generateId = require("../utils/generateId");
module.exports = function TaskCompleted(taskId) {
  return {
    eventId: generateId(),
    aggregateId: taskId,
    eventType: "Task Completed",
    payload: {
      completed: true
    },
    timestamp: Date.now()
  };
};
