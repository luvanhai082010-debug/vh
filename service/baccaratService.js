// service/baccaratService.js

// URL API LỊCH SỬ GAME (Sử dụng URL mới của Server Backend)
// CHÚ Ý: CẬP NHẬT URL NÀY NẾU URL RENDER CỦA BẠN THAY ĐỔI
const GAME_HISTORY_API = 'https://vh-57bx.onrender.com/api/game/history'; 

let lastPrediction = { 
    prediction: 'WAIT', 
    reason: 'Tool Robot đang khởi động và chờ dữ liệu Game.',
    timestamp: 0 
};

// Hàm dự đoán đơn giản (Simple Predictor)
function simplePredictor(historyString) {
    // 1. Lọc bỏ kết quả Hòa (T) và chỉ lấy 5 ván cuối
    const filteredResults = historyString.replace(/T/g, '').slice(-5);
    const len = filteredResults.length;

    if (len < 3) {
        return { prediction: 'XEM XÉT', reason: `Dữ liệu lịch sử quá ngắn (< 3 ván, hiện có ${len} ván không Hòa).` };
    }
    
    // Lấy 3 kết quả cuối cùng không Hòa
    const r1 = filteredResults[len - 1]; // Ván cuối
    const r2 = filteredResults[len - 2];
    const r3 = filteredResults[len - 3];
    
    // --- Logic Dự đoán ---
    
    // Phát hiện Bệt 3 cây liên tiếp
    if (r1 === r2 && r2 === r3) {
        if (r1 === 'B') {
            return { prediction: 'CÁI', reason: `Bệt CÁI (${r1}${r1}${r1}). Theo Bệt.` };
        } 
        if (r1 === 'P') {
            return { prediction: 'CON', reason: `Bệt CON (${r1}${r1}${r1}). Theo Bệt.` };
        }
    }
    
    // Đánh Ping Pong (xen kẽ)
    if ((r1 === 'B' && r2 === 'P') || (r1 === 'P' && r2 === 'B')) {
        // Nếu ván cuối là B, ván tiếp theo dự đoán là P (CON)
        const next = r1 === 'B' ? 'CON' : 'CÁI'; 
        return { prediction: next, reason: 'Cầu Ping Pong. Đánh ngược lại ván cuối.' };
    }
    
    // Dự đoán mặc định (theo kết quả ván cuối)
    return { 
        prediction: (r1 === 'B' ? 'CÁI' : 'CON'), 
        reason: `Dự đoán theo ván cuối (${r1}). Cần thêm dữ liệu.` 
    };
}

// Hàm cập nhật dự đoán bằng cách gọi API của chính Server
async function updatePrediction() {
    try {
        // Thêm timestamp để tránh lỗi cache
        const url = `${GAME_HISTORY_API}?t=${Date.now()}`; 
        
        // SỬ DỤNG fetch
        const response = await fetch(url);
        
        if (!response.ok) {
            // Log lỗi nếu API Game trả về lỗi
            throw new Error(`API Game trả về lỗi: ${response.status}`);
        }
        
        const data = await response.json(); 
        const historyString = data.results || ''; 
        
        if (historyString.length >= 5) { 
             const newPrediction = simplePredictor(historyString);
             // Cập nhật kết quả dự đoán cuối cùng
             lastPrediction = { ...newPrediction, timestamp: Date.now() };
        } else {
             lastPrediction = { 
                prediction: 'NẠP DATA', 
                reason: `Cần ít nhất 5 ván bài để phân tích. Hiện tại có ${historyString.length} ván.`, 
                timestamp: Date.now() 
             };
        }
        
    } catch (error) {
        console.error('Lỗi khi cập nhật dự đoán Tool:', error.message);
        lastPrediction = { 
            prediction: 'LỖI', 
            reason: `Lỗi kết nối/xử lý API Game: ${error.message}`, 
            timestamp: Date.now() 
        };
    }
}

// QUAN TRỌNG: Logic gây CRASH
// Server sẽ gọi hàm này mỗi 5 giây. Nếu Server chưa sẵn sàng, nó sẽ sập.
setInterval(updatePrediction, 5000); 

// Chạy lần đầu tiên khi Server khởi động
updatePrediction(); 

function getPrediction() {
    return lastPrediction;
}

module.exports = { getPrediction };
