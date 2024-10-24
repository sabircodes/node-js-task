// taskLogger.js
const fs = require('fs');

async function logTask(user_id) {
  const logMessage = `${user_id}-task completed at-${Date.now()}\n`;
  fs.appendFile('task_logs.txt', logMessage, (err) => {
    if (err) throw err;
    console.log(`Task for user ${user_id} logged.`);
  });
}

module.exports = { logTask };
