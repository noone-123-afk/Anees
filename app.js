const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// تفعيل حزم الأمان والتحكم بالطلبات
app.use(helmet({
  contentSecurityPolicy: false, // للسماح بتحميل الملفات الثابتة بشكل مريح
}));
app.use(cors());
app.use(express.json());

// تحديد مسار مجلد public للملفات الثابتة (واجهة المستخدم)
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// الاتصال بقاعدة البيانات MongoDB المحلية
mongoose.connect('mongodb://localhost:27017/Anees')
.then(() => console.log('✅ تم الاتصال بقاعدة البيانات MongoDB بنجاح'))
.catch(err => console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err));

// مسار الصفحة الرئيسية
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// إعداد الاتصال الفوري عبر Socket.io (للدردشة والغرف الجماعية)
io.on('connection', (socket) => {
  console.log('👤 مستخدم جديد متصل بنظام الأمان:', socket.id);

  // استقبال الرسائل وتوجيهها للغرف (سنطورها لاحقاً حسب الأقسام)
  socket.on('join_room', (roomName) => {
    socket.join(roomName);
    console.log(`المستخدم انضم إلى الغرفة: ${roomName}`);
  });

  socket.on('send_message', (data) => {
    io.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('👤 مستخدم قام بتسجيل الخروج:', socket.id);
  });
});

// تشغيل الخادم على المنفذ 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 خادم منصة أنيس يعمل بكفاءة وأمان على المنفذ ${PORT}`);
});