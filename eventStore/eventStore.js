const Event = require("../models/Event");

class EventStore {
  async save(event) {
    const newEvent = new Event(event);
    await newEvent.save();
  }

  async getEvents() {
    return await Event.find().sort({ timestamp: 1 });
  }
}

module.exports = new EventStore();