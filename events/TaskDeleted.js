const generateId = require("../utils/generateId");

module.exports = function TaskDeleted(taskId) {
  const now = new Date();
  return {
    eventId: generateId(),
    aggregateId: taskId,
    eventType: "TaskDeleted",
    payload: {},
    timestamp: now.toISOString()
  };
};
