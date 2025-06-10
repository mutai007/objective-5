const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: String,
  text: String,
  room: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
