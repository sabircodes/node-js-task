// taskController.js
const moment = require('moment');
const UserRequest = require('./models/UserRequest');
const queueManager = require('./queueManager');
const taskLogger = require('./taskLogger');

const RATE_LIMIT = { perSecond: 1, perMinute: 20 };  // Rate limits

// Handle task requests
async function handleTask(req, res) {
  const userId = req.body.user_id;
  const now = moment();
  
  try {
    // Find or create user request document
    let userRequest = await UserRequest.findOne({ user_id: userId });
    
    if (!userRequest) {
      userRequest = new UserRequest({ user_id: userId, timestamps: [] });
    }
    
    // Filter timestamps for the past second and minute
    const timestamps = userRequest.timestamps.filter(t => now.diff(t, 'seconds') < 60);
    const requestsLastSecond = timestamps.filter(t => now.diff(t, 'seconds') < 1).length;
    const requestsLastMinute = timestamps.length;
    
    // Check rate limits
    if (requestsLastSecond >= RATE_LIMIT.perSecond || requestsLastMinute >= RATE_LIMIT.perMinute) {
      // Queue the task if rate limit is exceeded
      await queueManager.addToQueue(userId);
      return res.status(429).send('Rate limit exceeded. Task queued.');
    }
    
    // Allow the task and log it
    userRequest.timestamps.push(now);
    await userRequest.save();
    
    // Log task completion
    await taskLogger.logTask(userId);
    
    return res.send('Task completed.');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error.');
  }
}

module.exports = { handleTask };
