module.exports = function TaskCompleted(taskId) {
  return {
    eventId: Date.now().toString(),
    aggregateId: taskId,
    eventType: "TaskCompleted",
    payload: {
      taskId: taskId
    },
    timestamp: new Date()
  };
};