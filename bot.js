const mineflayer = require('mineflayer');

// إعدادات البوت
const botOptions = {
  host: 'SimCraftS1.aternos.me', // عنوان السيرفر
  port: 34232,            // رقم منفذ السيرفر (الافتراضي هو 25565)
  username: 'server_bot', // اسم البوت
 
};

// متغير لتخزين المؤقت
let reconnectTimeout;

// دالة لإنشاء البوت
function createBot() {
  const bot = mineflayer.createBot(botOptions);

  // عند حدوث خطأ
  bot.on('error', (err) => console.log(`Error: ${err.message}`));

  // عند انقطاع الاتصال
  bot.on('end', () => {
    console.log('Disconnected! Attempting to reconnect in 1 seconds...');
    
    // إذا كان هناك مؤقت موجود، قم بإلغائه لتجنب التكرار
    if (reconnectTimeout) clearTimeout(reconnectTimeout);

    // إعداد مؤقت جديد لمحاولة إعادة الاتصال بعد 5 ثوانٍ
    reconnectTimeout = setTimeout(createBot, 5000);
  });

  // عند تسجيل الدخول بنجاح
  bot.on('spawn', () => {
    console.log('Bot has spawned successfully!');

    // إلغاء أي مؤقت إعادة اتصال موجود عند تسجيل الدخول
    if (reconnectTimeout) clearTimeout(reconnectTimeout);
  });
}

// بدء البوت
createBot();


