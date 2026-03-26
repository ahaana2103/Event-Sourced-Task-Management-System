const eventStore = require("../eventStore/eventStore");
const createTaskEvent = require("../events/TaskCreated");
const updateTaskEvent = require("../events/TaskUpdated");
const completeTaskEvent = require("../events/TaskCompleted");
const deleteTaskEvent = require("../events/TaskDeleted");

class TaskService {

    createTask(task) {
        const event = createTaskEvent(task.id, task.title);
        eventStore.save(event);
        return task;
    }
    updateTask(taskId, newTitle) {
        const event = updateTaskEvent(taskId, newTitle);
        eventStore.save(event);
        return { id: taskId, title: newTitle };
    }

    completeTask(taskId) {
        const event = completeTaskEvent(taskId);
        eventStore.save(event);
        return { id: taskId, completed: true };
    }

    deleteTask(id) {
        const event = deleteTaskEvent(taskId);
        eventStore.save(event);
        return { id };
    }
}

module.exports = new TaskService();
