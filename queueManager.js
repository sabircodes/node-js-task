// queueManager.js
const mongoose = require('mongoose');
const taskLogger = require('./taskLogger');

const pendingTaskSchema = new mongoose.Schema({
  user_id: String,
  createdAt: { type: Date, default: Date.now },
});

const PendingTask = mongoose.model('PendingTask', pendingTaskSchema);

async function addToQueue(user_id) {
  const task = new PendingTask({ user_id });
  await task.save();
  console.log(`Task for user ${user_id} queued.`);
  
  // Process queued tasks after a delay (e.g., 1 second)
  setTimeout(async () => {
    await processQueue();
  }, 1000);  // 1 second delay
}

async function processQueue() {
  const task = await PendingTask.findOne().sort({ createdAt: 1 });
  if (task) {
    await taskLogger.logTask(task.user_id);
    await task.remove();  // Remove processed task from the queue
  }
}

module.exports = { addToQueue, processQueue };
