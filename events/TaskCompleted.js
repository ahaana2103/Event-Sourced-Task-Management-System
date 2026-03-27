const generateId = require("../utils/generateId");
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
module.exports = function TaskCompleted(taskId) {
  const now = new Date();
  return {
    eventId: generateId(),
    aggregateId: taskId,
    eventType: "TaskCompleted",
    payload: {
<<<<<<< Updated upstream
      completed: true
    },
    timestamp: now.toISOString()
=======
      taskId
    },
    timestamp: new Date().toISOString()
>>>>>>> Stashed changes
  };
};
