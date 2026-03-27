const generateId = require("../utils/generateId");
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
module.exports = function TaskCreated(taskId, title) {
  const now = new Date();
  return {
    eventId: generateId(),
    aggregateId: taskId,
    eventType: "TaskCreated",
    payload: {
      title
    },
<<<<<<< Updated upstream
    timestamp: now.toISOString()
=======
    timestamp: new Date().toISOString()
>>>>>>> Stashed changes
  };
};
