# Node.js Task Queueing and Rate Limiting API

This repository contains a **Node.js API** that handles user-specific tasks while enforcing **rate limits** and utilizing a **task queueing system**. The system ensures that tasks are processed based on the following limits:
- **1 task per second** per user.
- **A maximum of 20 tasks per minute** per user.

Tasks that exceed these limits are **queued** and processed after a delay, ensuring no requests are dropped.

## Features
- **User-Based Rate Limiting**: Controls the number of tasks each user can process per second and per minute.
- **Task Queueing**: Tasks exceding the rate limit are queued and processed later.
- **Task Logging**: Each task is logged with the user ID and the timestamp when it  completed.
- **MongoDB Atlas Integration**: All user requests, rate limits, and queued tasks are managed through MongoDB.
- **Node.js Clustering**: The API uses clustering to distribute tasks across multiple processes, ensuring scalability and resilience.

## Installation Instructions

### Prerequisites
- **Node.js** (>=12.x)
- **MongoDB Atlas** account and cluster set up
- **Postman** (for testing API routes)


