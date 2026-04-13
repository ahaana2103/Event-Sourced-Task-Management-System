const generateId = require("../utils/generateId");

module.exports = function TaskCreated(taskId, title) {
  const now = new Date();
  return {
    eventId: generateId(),
    aggregateId: taskId,
    eventType: "TaskCreated",
    payload: {
      title
    },
    timestamp: now.toISOString()
  };
};
