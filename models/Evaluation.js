const mongoose = require('mongoose');

// تعريف مخطط التقييم
const evaluationSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// إنشاء الموديل
const Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = Evaluation;
