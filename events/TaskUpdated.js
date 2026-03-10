module.exports = function TaskUpdated(taskId, title) {
  return {
    eventId: Date.now().toString(),
    aggregateId: taskId,
    eventType: "TaskUpdated",
    payload: {
      title: title
    },
    timestamp: new Date()
  };
};