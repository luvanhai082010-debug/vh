// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const userExists = await User.findOne({ where: { username } });

    if (userExists) {
        return res.status(400).json({ message: 'Tên người dùng đã tồn tại.' });
    }
    
    const userCount = await User.count();
    const isAdmin = userCount === 0; 

    const user = await User.create({ username, password, isAdmin });

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            balance: user.balance,
            token: generateToken(user.id),
        });
    } else {
        res.status(400).json({ message: 'Dữ liệu người dùng không hợp lệ.' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            balance: user.balance,
            token: generateToken(user.id),
        });
    } else {
        res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không đúng.' });
    }
});

module.exports = router;
