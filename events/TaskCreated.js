const generateId = require("../utils/generateId");
module.exports = function TaskCreated(taskId, title) {
  return {
    eventId: generateId(),
    aggregateId: taskId,
    eventType: "TaskCreated",
    payload: {
      title: title
    },
    timestamp: Date.now()
  };
};
