// middleware/toolAccess.js
const checkToolAccess = (req, res, next) => {
    // Nếu người dùng có quyền Admin hoặc quyền Tool Access được bật
    if (req.user && (req.user.isAdmin || req.user.toolAccess)) {
        next();
    } else {
        res.status(403).json({ message: 'Bạn không có quyền truy cập Tool Robot. Vui lòng liên hệ Admin.' });
    }
};

module.exports = { checkToolAccess };
