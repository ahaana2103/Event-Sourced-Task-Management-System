module.exports = function TaskCreated(taskId, title) {
  return {
    eventId: Date.now().toString(),
    aggregateId: taskId,
    eventType: "TaskCreated",
    payload: {
      title: title
    },
    timestamp: new Date()
  };
};