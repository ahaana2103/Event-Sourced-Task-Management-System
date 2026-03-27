const eventStore = require("../eventStore/eventStore");
const { loadSnapshot, saveSnapshot } = require("../utils/snapshot");

const SNAPSHOT_INTERVAL = 3;

function createEmptyState() {
    return {
        tasks: {}
    };
}

function applyEvent(state, event) {
    const nextState = {
        tasks: {
            ...state.tasks
        }
    };

    switch (event.eventType) {
    case "TaskCreated":
        nextState.tasks[event.aggregateId] = {
            id: event.aggregateId,
            title: event.payload.title,
            completed: false,
            deleted: false
        };
        break;
    case "TaskUpdated":
        if (nextState.tasks[event.aggregateId]) {
            nextState.tasks[event.aggregateId] = {
                ...nextState.tasks[event.aggregateId],
                title: event.payload.title
            };
        }
        break;
    case "TaskCompleted":
        if (nextState.tasks[event.aggregateId]) {
            nextState.tasks[event.aggregateId] = {
                ...nextState.tasks[event.aggregateId],
                completed: true
            };
        }
        break;
    case "TaskDeleted":
        if (nextState.tasks[event.aggregateId]) {
            nextState.tasks[event.aggregateId] = {
                ...nextState.tasks[event.aggregateId],
                deleted: true
            };
        }
        break;
    default:
        break;
    }

    return nextState;
}

function replayEvents(events, initialState = createEmptyState()) {
    return events.reduce((state, event) => applyEvent(state, event), initialState);
}

function buildProjection() {
    const snapshot = loadSnapshot();
    const snapshotState = snapshot ? snapshot.state : createEmptyState();
    const lastSequence = snapshot ? snapshot.lastSequence : 0;
    const pendingEvents = eventStore.getEventsAfter(lastSequence);
    const projectedState = replayEvents(pendingEvents, snapshotState);

    const latestSequence = pendingEvents.length
        ? pendingEvents[pendingEvents.length - 1].sequence
        : lastSequence;

    if (pendingEvents.length >= SNAPSHOT_INTERVAL) {
        saveSnapshot(projectedState, latestSequence);
    }

    return {
        state: projectedState,
        lastSequence: latestSequence
    };
}

module.exports = {
    applyEvent,
    replayEvents,
    buildProjection,
    createEmptyState
};
