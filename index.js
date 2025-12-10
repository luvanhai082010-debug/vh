// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./db'); // Đảm bảo đường dẫn này đúng: ./db

dotenv.config();
const app = express();

// --- MIDDLEWARE ---
// [1] Quan trọng: Middleware này phải nằm trên các route để đọc Body JSON
app.use(express.json()); 
app.use(cors()); 

// [2] Kết nối Database (sẽ tự tạo file database.sqlite)
connectDB(); 

// --- ROUTES ---
// [3] Require các file Route
const authRoutes = require('./routes/auth'); 
const adminRoutes = require('./routes/admin'); 
const gameRoutes = require('./routes/game'); 
const toolRoutes = require('./routes/tool'); 

// [4] Định nghĩa các API Endpoint
app.use('/api/auth', authRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/tool', toolRoutes); 

// [5] Route Gốc (Health Check)
app.get('/', (req, res) => {
    res.send('Baccarat Admin API Server đang hoạt động với SQLite!');
});

// --- KHỞI ĐỘNG SERVER ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server đang chạy trên cổng ${PORT}`));
