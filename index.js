// index.js (Phiên bản TỐI GIẢN - Loại trừ lỗi Routes)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./db'); 

dotenv.config();
const app = express();

// --- MIDDLEWARE ---
// Middleware đọc Body JSON (quan trọng để tránh lỗi 400)
app.use(express.json()); 
app.use(cors()); 

// [TẠM THỜI VÔ HIỆU HÓA TẤT CẢ CÁC ROUTES]
// const authRoutes = require('./routes/auth'); 
// const adminRoutes = require('./routes/admin'); 
// const gameRoutes = require('./routes/game'); 
// const toolRoutes = require('./routes/tool'); 

// app.use('/api/auth', authRoutes); 
// app.use('/api/admin', adminRoutes);
// app.use('/api/game', gameRoutes);
// app.use('/api/tool', toolRoutes); 

// [CHỈ KẾT NỐI DATABASE VÀ CHẠY ROUTE GỐC]
connectDB(); 

// Route Gốc (Health Check) - Tuyến đường duy nhất còn lại
app.get('/', (req, res) => {
    res.send('Baccarat Admin API Server đang hoạt động với SQLite! (Tối giản)');
});

// --- KHỞI ĐỘNG SERVER ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server đang chạy trên cổng ${PORT}`));
