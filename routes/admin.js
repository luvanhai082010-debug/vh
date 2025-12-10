// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

router.get('/users', protect, admin, async (req, res) => {
    const users = await User.findAll({ 
        attributes: ['id', 'username', 'isAdmin', 'toolAccess', 'balance', 'createdAt'] 
    });
    res.json(users);
});

router.post('/deposit', protect, admin, async (req, res) => {
    const { userId, amount } = req.body;

    if (!userId || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: 'Dữ liệu cấp tiền không hợp lệ.' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    }

    user.balance += amount;
    await user.save();

    res.json({
        message: `Đã cấp thành công ${amount} vào tài khoản ${user.username}`,
        newBalance: user.balance,
    });
});

router.post('/toggleTool', protect, admin, async (req, res) => {
    const { userId, access } = req.body;

    if (!userId || typeof access !== 'boolean') {
        return res.status(400).json({ message: 'Dữ liệu cập nhật quyền không hợp lệ.' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    }

    user.toolAccess = access;
    await user.save();

    res.json({
        message: `Đã ${access ? 'BẬT' : 'TẮT'} quyền truy cập Tool cho ${user.username}`,
        toolAccess: user.toolAccess,
    });
});

module.exports = router;
