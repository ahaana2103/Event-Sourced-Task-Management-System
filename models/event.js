const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  eventType: {type: String, required:true},
  aggregateId:{type: String, required:true},
  payload:{type: mongoose.Schema.Types.Mixed, required:true},
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", eventSchema);
