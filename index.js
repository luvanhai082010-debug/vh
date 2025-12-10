// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./db'); 

dotenv.config();
const app = express();

app.use(express.json()); 
app.use(cors()); 

connectDB(); 

const authRoutes = require('./routes/auth'); 
const adminRoutes = require('./routes/admin'); 
const gameRoutes = require('./routes/game'); 
const toolRoutes = require('./routes/tool'); 

app.use('/api/auth', authRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/tool', toolRoutes); 

app.get('/', (req, res) => {
    res.send('Baccarat Admin API Server đang hoạt động với SQLite!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server đang chạy trên cổng ${PORT}`));
