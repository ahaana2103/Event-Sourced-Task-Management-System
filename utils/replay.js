const eventStore = require("../eventStore/eventStore");

async function replayEvents() {
  const events = await eventStore.getEvents();
  return events.reduce((state, event) => {
    const { eventType, payload, aggregateId } = event;

    if (eventType === "TaskCreated") {
      return {
        ...state,
        [aggregateId]: {
          id: aggregateId,
          title: payload.title,
          completed: false
        }
      };
    }

    if (eventType === "TaskUpdated" && state[aggregateId]) {
      return {
        ...state,
        [aggregateId]: {
          ...state[aggregateId],
          title: payload.title
        }
      };
    }

    if (eventType === "TaskCompleted" && state[aggregateId]) {
      return {
        ...state,
        [aggregateId]: {
          ...state[aggregateId],
          completed: true
        }
      };
    }

    if (eventType === "TaskDeleted" && state[aggregateId]) {
      const { [aggregateId]: deletedTask, ...remainingState } = state;
      return remainingState;
    }

    return state;
  }, {});
}

module.exports = replayEvents;
