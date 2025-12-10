// service/baccaratService.js

// URL API LỊCH SỬ GAME (Sử dụng URL mới của Server Backend)
const GAME_HISTORY_API = 'https://vh-57bx.onrender.com/api/game/history'; 

let lastPrediction = { 
    prediction: 'WAIT', 
    reason: 'Tool Robot đang khởi động và chờ dữ liệu Game.',
    timestamp: 0 
};

// Hàm dự đoán đơn giản (Simple Predictor) - GIỮ NGUYÊN
function simplePredictor(historyString) {
    // ... (Logic dự đoán của bạn giữ nguyên)
    // ... 
}

// Hàm cập nhật dự đoán bằng cách gọi API của chính Server - GIỮ NGUYÊN
async function updatePrediction() {
    try {
        // ... (Logic gọi fetch và xử lý dữ liệu)
        // ...
    } catch (error) {
        console.error('Lỗi khi cập nhật dự đoán Tool:', error.message);
        // ...
    }
}

// -----------------------------------------------------
// QUAN TRỌNG: ĐÃ COMMENT LOGIC GÂY CRASH LOOP
// -----------------------------------------------------

// TẠM THỜI VÔ HIỆU HÓA ĐỂ TRÁNH SERVER CRASH SAU KHỞI ĐỘNG
// setInterval(updatePrediction, 5000); 
// updatePrediction(); 

// -----------------------------------------------------

function getPrediction() {
    return lastPrediction;
}

module.exports = { getPrediction };
