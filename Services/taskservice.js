const eventStore = require("../eventStore/eventStore");

class TaskService {
    // Create a new task
    createTask(task) {
        const event = {
            type: "Task_Created",
            data: task
        };
        eventStore.save(event);
        return task;
    }
    // Update an existing task
    deleteTask(id){
        const event = {
            type: "Task_Deleted",
            data: {id}
        }
        eventStore.save(event)
    }
}
module.exports = new TaskService();