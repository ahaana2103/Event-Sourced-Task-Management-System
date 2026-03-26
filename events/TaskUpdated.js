module.exports = function TaskUpdated(taskId, title) {
  const now = new Date(); // current date & time
  return {
    eventId: Date.now().toString(),
    aggregateId: taskId,
    eventType: "TaskUpdated",
    payload: {
      title: title
    },
    timestamp: now.toISOString() // human readable format
  };
};