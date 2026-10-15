const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nickname: { type: String, required: true },   // الاسم المستعار
  passwordHash: { type: String, required: true }, // كلمة مرور مشفرة
  role: { type: String, default: 'user' },      // user / admin
  points: { type: Number, default: 0 },         // نقاط الالتزام بالقوانين
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
