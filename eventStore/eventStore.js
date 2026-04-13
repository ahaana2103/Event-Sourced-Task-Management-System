const Event = require("../models/event");

async function save(event) {
  await Event.create(event);
}

async function getEvents() {
  return await Event.find().sort({ timestamp: 1 });
}

module.exports = {save, getEvents};