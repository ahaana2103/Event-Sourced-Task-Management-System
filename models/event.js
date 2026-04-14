const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, immutable: true },
  eventType: { type: String, required: true, immutable: true },
  aggregateId: { type: String, required: true, immutable: true },
  payload: { type: mongoose.Schema.Types.Mixed, required: true, immutable: true },
  timestamp: { type: Date, default: Date.now, immutable: true }
});

module.exports = mongoose.model("Event", eventSchema);
