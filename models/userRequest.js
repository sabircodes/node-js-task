// models/UserRequest.js
const mongoose = require('mongoose');

const userRequestSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  timestamps: { type: [Date], default: [] },
});

module.exports = mongoose.model('UserRequest', userRequestSchema);
