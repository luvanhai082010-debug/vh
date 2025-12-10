// db.js

const { Sequelize } = require('sequelize');
const path = require('path');

// [1] Khởi tạo Sequelize và trỏ đến file database.sqlite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    // Đảm bảo file database.sqlite được tạo ở thư mục gốc của dự án
    storage: path.join(__dirname, 'database.sqlite'), 
    logging: false, // Tắt logging SQL để log Render sạch hơn
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Đã kết nối SQLite thành công!');
        
        // [2] QUAN TRỌNG: Phải REQUIRE Models trước khi SYNC
        // Đảm bảo tên thư mục 'models' KHỚP CHÍNH XÁC với thư mục trên GitHub (phân biệt hoa/thường)
        require('./models/User'); 
        require('./models/Result'); 

        // [3] Đồng bộ hóa: Tạo bảng nếu chưa tồn tại (alter: true để cập nhật cấu trúc bảng)
        await sequelize.sync({ alter: true }); 
        console.log('✅ Đã đồng bộ hóa các bảng (Tables) thành công!');

    } catch (error) {
        // [4] Báo lỗi rõ ràng và thoát nếu có sự cố
        console.error(`Lỗi kết nối SQLite: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = { sequelize, connectDB };
