// server.js
const cluster = require('cluster');
const os = require('os');
const express = require('express');
const mongoose = require('mongoose');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  // Fork workers (2 replicas)
  for (let i = 0; i < 2; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();  // Ensure workers restart on crash
  });
} else {
  // Worker process
  const app = express();
  app.use(express.json());
  
  // Connect to MongoDB Atlas
  try{
  mongoose.connect('mongodb+srv://smdakhtar007:sabir123@cluster0.2cnce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  }).then(console.log('Connected to MongoDB Atlas'));
}catch(err){    
    console.log(err);       
}

  // Define task route
  const taskController = require('./taskController');
  app.post('/task', taskController.handleTask);

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on port ${PORT}`);
  });
}
