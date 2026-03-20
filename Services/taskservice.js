const eventStore = require("../eventStore/eventStore");
const createTaskEvent = require("../events/TaskCreated");
const deleteTaskEvent = require("../events/TaskDeleted");

class TaskService {

    createTask(task) {
        const event = createTaskEvent(task.id, task.title);
        eventStore.save(event);
        return task;
    }

    deleteTask(id) {
        const event = deleteTaskEvent(id);
        eventStore.save(event);
        return { id };
    }
}

module.exports = new TaskService();
