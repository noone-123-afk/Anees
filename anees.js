// استدعاء المكتبات
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// استدعاء الموديلات
const User = require('./models/User');
const Room = require('./models/Room');
const Message = require('./models/Message');
const Evaluation = require('./models/Evaluation');

// الاتصال بقاعدة البيانات
mongoose.connect('mongodb://127.0.0.1:27017/Anees')
  .then(() => {
    console.log("✅ تم الاتصال بقاعدة البيانات Anees");
  })
  .catch((err) => {
    console.error("❌ خطأ في الاتصال بقاعدة البيانات:", err);
  });

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.send('مرحباً بك في موقع Anees');
});

// تجربة إضافة مستخدم جديد
app.get('/add-user', async (req, res) => {
  try {
    const newUser = new User({
      nickname: "anees",          // الاسم المستعار (مطلوب)
      passwordHash: "123456",     // كلمة مرور مشفرة (مطلوب)
      role: "user",               // نوع الحساب
      points: 0                   // نقاط البداية
    });

    await newUser.save();
    res.send("✅ تم إنشاء مستخدم جديد بنجاح");
  } catch (err) {
    res.send("❌ حدث خطأ أثناء إنشاء المستخدم: " + err.message);
  }
});

// عرض جميع المستخدمين
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();   // جلب جميع المستخدمين من قاعدة البيانات
    res.json(users);                   // عرضهم كـ JSON في المتصفح
  } catch (err) {
    res.send("❌ حدث خطأ أثناء جلب المستخدمين: " + err.message);
  }
});

// تشغيل السيرفر
app.listen(3000, () => {
  console.log("🚀 السيرفر يعمل الآن على http://localhost:3000");
});
