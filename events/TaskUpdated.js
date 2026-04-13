const generateId = require("../utils/generateId");

module.exports = function TaskUpdated(taskId, title) {
  const now = new Date(); // current date & time
  return {
    eventId: generateId(),
    aggregateId: taskId,
    eventType: "TaskUpdated",
    payload: {
      title
    },
    timestamp: now.toISOString() // human readable format
  };
};
