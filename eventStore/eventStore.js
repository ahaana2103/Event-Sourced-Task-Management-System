let events = [];

module.exports = {
  save(event) {
    events.push(event);
  },

  getAll() {
    return events;
  },

  getByAggregateId(aggregateId) {
    return events.filter(e => e.aggregateId === aggregateId);
  },

  clear() {
    events = [];
  }
};