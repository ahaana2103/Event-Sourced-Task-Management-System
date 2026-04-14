const Event = require("../models/event");

async function save(event) {
  try {
    await Event.create(event);
  } catch (err) {
    console.error("Error saving event:", err);
    throw err; // send error to route
  }
}
async function getEvents() {
  try {
    return await Event.find().sort({ timestamp: 1 });
  } catch (err) {
    console.error("Error fetching events:", err);
    throw err;
  }
}

module.exports = {save, getEvents};