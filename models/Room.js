const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  type: { type: String, required: true },       // friend / love / work / help
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isVoiceEnabled: { type: Boolean, default: false },
  rulesAccepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);
