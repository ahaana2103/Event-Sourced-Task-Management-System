const eventStore = require("../eventStore/eventStore");
const createTaskEvent = require("../events/TaskCreated");
const updateTaskEvent = require("../events/TaskUpdated");
const completeTaskEvent = require("../events/TaskCompleted");
const deleteTaskEvent = require("../events/TaskDeleted");

class TaskService {

  async createTask(task) {
    const event = createTaskEvent(task.id, task.title);
    await eventStore.save(event);
    return { id: task.id, title: task.title, completed: false };
  }

  async updateTask(taskId, newTitle) {
    const event = updateTaskEvent(taskId, newTitle);
    await eventStore.save(event);
    return { id: taskId, title: newTitle };
  }

  async completeTask(taskId) {
    const event = completeTaskEvent(taskId);
    await eventStore.save(event);
    return { id: taskId, completed: true };
  }

  async deleteTask(taskId) {
    const event = deleteTaskEvent(taskId);
    await eventStore.save(event);
    return { id: taskId };
  }

  async getAllTasks() {
    const tasks = {};
    const events =await eventStore.getEvents();

    events.forEach(event => {
      const { eventType, payload, aggregateId } = event;

      if (eventType === "TaskCreated") {
        tasks[aggregateId] = {
          id: aggregateId,
          title: payload.title,
          completed: false
        };
      }

      else if (eventType === "TaskUpdated") {
        if (tasks[aggregateId]) {
          tasks[aggregateId].title = payload.title;
        }
      }

      else if (eventType === "TaskCompleted") {
        if (tasks[aggregateId]) {
          tasks[aggregateId].completed = true;
        }
      }

      else if (eventType === "TaskDeleted") {
        delete tasks[aggregateId];
      }
    });

    return tasks;
  }
}

module.exports = new TaskService();
