function validateEvent(event) {
    if (!event.eventId) throw new Error("Missing eventId");
    if (!event.aggregateId) throw new Error("Missing aggregateId");
    if (!event.eventType) throw new Error("Missing eventType");
    if (!event.payload) throw new Error("Missing payload");
    if (!event.timestamp) throw new Error("Missing timestamp");

    return true;
}

module.exports = validateEvent;