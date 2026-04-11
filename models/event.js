const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventType: String,
  aggregateId: String,
  payload: Object,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", eventSchema);