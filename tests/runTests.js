const assert = require("assert");

const generateId = require("../utils/generateId");
const validateEvent = require("../utils/eventValidator");
const createTaskEvent = require("../events/TaskCreated");
const updateTaskEvent = require("../events/TaskUpdated");
const completeTaskEvent = require("../events/TaskCompleted");
const Event = require("../models/event");

function testGenerateId() {
  const id = generateId();

  assert.strictEqual(typeof id, "string");
  assert.ok(id.startsWith("evt_"), "ID should start with evt_");
  assert.ok(!id.includes("-"), "ID should not look like a UUID");
}

function testCreateEventIsValid() {
  const event = createTaskEvent("task-1", "Draft report");

  assert.strictEqual(event.aggregateId, "task-1");
  assert.strictEqual(event.eventType, "TaskCreated");
  assert.deepStrictEqual(event.payload, { title: "Draft report" });
  assert.ok(event.timestamp, "Event should include a timestamp");
  assert.strictEqual(validateEvent(event), true);
}

function testUpdateAndCompleteEventsAppendNewFacts() {
  const updateEvent = updateTaskEvent("task-1", "Final report");
  const completeEvent = completeTaskEvent("task-1");

  assert.strictEqual(updateEvent.eventType, "TaskUpdated");
  assert.deepStrictEqual(updateEvent.payload, { title: "Final report" });
  assert.strictEqual(completeEvent.eventType, "TaskCompleted");
  assert.deepStrictEqual(completeEvent.payload, { completed: true });
}

function testValidatorRejectsMissingFields() {
  assert.throws(() => validateEvent({}), /Missing eventId/);
  assert.throws(
    () =>
      validateEvent({
        eventId: "evt_1",
        aggregateId: "task-1",
        eventType: "TaskCreated",
        timestamp: new Date().toISOString()
      }),
    /Missing payload/
  );
}

function testEventSchemaIsImmutable() {
  assert.strictEqual(Event.schema.path("eventId").options.immutable, true);
  assert.strictEqual(Event.schema.path("eventType").options.immutable, true);
  assert.strictEqual(Event.schema.path("aggregateId").options.immutable, true);
  assert.strictEqual(Event.schema.path("payload").options.immutable, true);
  assert.strictEqual(Event.schema.path("timestamp").options.immutable, true);
}

function run() {
  testGenerateId();
  testCreateEventIsValid();
  testUpdateAndCompleteEventsAppendNewFacts();
  testValidatorRejectsMissingFields();
  testEventSchemaIsImmutable();
  console.log("All tests passed");
}

run();
