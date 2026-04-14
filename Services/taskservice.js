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
    console.log("TaskService.deleteTask received taskId:", taskId);
    const event = deleteTaskEvent(taskId);
    console.log("Generated delete event:", event);
    await eventStore.save(event);
    console.log("Delete event saved for taskId:", taskId);
    return { id: taskId };
  }

  async getAllTasks() {
    const events =await eventStore.getEvents();
    return events.reduce((tasks, event) => {
      const { eventType, payload, aggregateId } = event;

      if (eventType === "TaskCreated") {
        return {
          ...tasks,
          [aggregateId]: {
            id: aggregateId,
            title: payload.title,
            completed: false
          }
        };
      }

      if (eventType === "TaskUpdated" && tasks[aggregateId]) {
        return {
          ...tasks,
          [aggregateId]: {
            ...tasks[aggregateId],
            title: payload.title
          }
        };
      }

      if (eventType === "TaskCompleted" && tasks[aggregateId]) {
        return {
          ...tasks,
          [aggregateId]: {
            ...tasks[aggregateId],
            completed: true
          }
        };
      }

      if (eventType === "TaskDeleted" && tasks[aggregateId]) {
        const { [aggregateId]: deletedTask, ...remainingTasks } = tasks;
        return remainingTasks;
      }

      return tasks;
    }, {});
  }
}

module.exports = new TaskService();
