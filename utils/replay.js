const eventStore = require("../eventStore/eventStore");
const { loadSnapshot, saveSnapshot } = require("./snapshot");
const { logEvent } = require("./logger");

function replayEvents() {
    // Load Snapshot if available
    let snapshot = loadSnapshot();
    let state = snapshot ? snapshot.state : {};
    let lastEventId = snapshot ? snapshot.lastEventId : null;

    const allEvents = eventStore.getAll();

    //Filter only NEW events (after snapshot)
    const eventsToReplay = lastEventId
        ? allEvents.filter(event => event.eventId > lastEventId)
        : allEvents;

    // Apply events in order
    for (const event of eventsToReplay) {
        logEvent(event);

        switch (event.eventType) {
            case "TASK_CREATED":
                state[event.aggregateId] = {
                    id: event.aggregateId,
                    ...event.payload
                };
                break;

            case "TASK_UPDATED":
                if (state[event.aggregateId]) {
                    state[event.aggregateId] = {
                        ...state[event.aggregateId],
                        ...event.payload
                    };
                }
                break;

            case "TASK_DELETED":
                delete state[event.aggregateId];
                break;

            default:
                console.warn("Unknown event type:", event.eventType);
        }
    }

    // Save new snapshot every 10 events (optional rule)
    if (eventsToReplay.length >= 10) {
        const lastEvent = eventsToReplay.at(-1);
        saveSnapshot({
            state,
            lastEventId: lastEvent.eventId,
            timestamp: Date.now()
        });
    }

    return state;
}

module.exports = replayEvents;