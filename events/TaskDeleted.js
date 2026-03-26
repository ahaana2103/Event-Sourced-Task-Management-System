const generateId = require("../utils/generateId");

module.exports = function TaskDeleted(taskId) {
    const now = new Date(); // current date & time

    return {
        eventId: generateId(),     
        aggregateId: taskId,       
        eventType: "TaskDeleted",  
        payload: {
            deleted: true         
        },
        timestamp: now.toISOString()
    };
};