// routes/tool.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth'); 
const { checkToolAccess } = require('../middleware/toolAccess');
const { getPrediction } = require('../service/baccaratService'); 

// @route   GET /api/tool/predict
// @desc    Lấy kết quả dự đoán của Tool Robot
router.get('/predict', protect, checkToolAccess, async (req, res) => {
    try {
        const prediction = getPrediction();
        res.json({ status: "SUCCESS", result: prediction.prediction, reason: prediction.reason, timestamp: prediction.timestamp });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi Server khi lấy dự đoán Tool.', error: error.message });
    }
});

module.exports = router;
