const eventStore = require("../eventStore/eventStore");

function replayEvents() {
  const events = eventStore.getEvents();
  const state = {};

  for (const event of events) {
    const { eventType, payload, aggregateId } = event;

    if (eventType === "TaskCreated") {
      state[aggregateId] = {
        id: aggregateId,
        title: payload.title,
        completed: false
      };
    }

    else if (eventType === "TaskUpdated") {
      if (state[aggregateId]) {
        state[aggregateId].title = payload.title;
      }
    }

    else if (eventType === "TaskCompleted") {
      if (state[aggregateId]) {
        state[aggregateId].completed = true;
      }
    }

    else if (eventType === "TaskDeleted") {
      delete state[aggregateId];
    }
  }

  return state;
}

module.exports = replayEvents;