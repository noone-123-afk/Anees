const mongoose = require('mongoose');

// تعريف مخطط الرسائل
const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

// إنشاء الموديل
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
