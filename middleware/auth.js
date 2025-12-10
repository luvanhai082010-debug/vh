// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findByPk(decoded.id);

            if (!req.user) {
                return res.status(401).json({ message: 'Token không hợp lệ, Người dùng không tồn tại.' });
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Không có Token, quyền truy cập bị từ chối.' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Không đủ quyền Admin.' });
    }
};

module.exports = { protect, admin };
