// routes/game.js
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { createNewRound, getHistoryString } = require('../service/gameEngine'); 

router.post('/new_round', protect, admin, async (req, res) => {
    try {
        const newRound = await createNewRound();
        res.status(201).json({ 
            message: 'Đã tạo ván bài mới thành công.', 
            result: newRound.result,
            roundId: newRound.roundId
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi Server khi tạo ván mới.', error: error.message });
    }
});

router.get('/history', async (req, res) => {
    try {
        const history = await getHistoryString();
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi Server khi lấy lịch sử.', error: error.message });
    }
});

module.exports = router;
