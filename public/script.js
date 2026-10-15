document.addEventListener('DOMContentLoaded', async () => {
    // كود زر تسجيل الدخول
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            alert("مرحبًا بك في Anees! سيتم لاحقًا إضافة نظام تسجيل الدخول.");
        });
    }

    // جلب وعرض المستخدمين من قاعدة البيانات بشكل ذكي
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        
        const usersList = document.getElementById('users-list');
        usersList.innerHTML = '';

        if (users.length === 0) {
            usersList.innerHTML = '<li>لا يوجد مستخدمون حالياً.</li>';
            return;
        }

        users.forEach(user => {
            // التحقق من اسم المستخدم أو اسم الحقل المخزن في قاعدة البيانات
            const userName = user.name || user.username || user.fullname || 'مستخدم مجهول';
            const userPoints = user.points !== undefined ? user.points : 0;

            const li = document.createElement('li');
            li.textContent = `الاسم المستعار: ${userName} | النقاط: ${userPoints}`;
            usersList.appendChild(li);
        });
    } catch (error) {
        console.error('خطأ في جلب بيانات المستخدمين:', error);
    }
});