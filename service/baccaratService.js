// service/baccaratService.js
// URL API LỊCH SỬ GAME (Sử dụng tên miền mới của Server Backend)
const GAME_HISTORY_API = 'https://vh-57bx.onrender.com/api/game/history'; 

let lastPrediction = { 
    prediction: 'WAIT', 
    reason: 'Tool Robot đang khởi động và chờ dữ liệu Game.',
    timestamp: 0 
};

function simplePredictor(historyString) {
    const filteredResults = historyString.replace(/T/g, '').slice(-5);
    const len = filteredResults.length;

    if (len < 3) {
        return { prediction: 'XEM XÉT', reason: 'Dữ liệu lịch sử quá ngắn (< 3 ván không Hòa).' };
    }
    
    const r1 = filteredResults[len - 1]; 
    const r2 = filteredResults[len - 2];
    const r3 = filteredResults[len - 3];
    
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
        const next = r1 === 'B' ? 'CON' : 'CÁI';
        return { prediction: next, reason: 'Cầu Ping Pong. Đánh ngược lại ván cuối.' };
    }
    
    return { 
        prediction: (r1 === 'B' ? 'CÁI' : 'CON'), 
        reason: `Dự đoán theo ván cuối (${r1}).` 
    };
}

async function updatePrediction() {
    try {
        const url = `${GAME_HISTORY_API}?t=${Date.now()}`; 
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API Game trả về lỗi: ${response.status}`);
        }
        
        const data = await response.json(); 
        const historyString = data.results || ''; 
        
        if (historyString.length >= 5) { 
             const newPrediction = simplePredictor(historyString);
             lastPrediction = { ...newPrediction, timestamp: Date.now() };
        } else {
             lastPrediction = { 
                prediction: 'NẠP DATA', 
                reason: 'Cần ít nhất 5 ván bài đã được tạo (Admin chạy /api/game/new_round).', 
                timestamp: Date.now() 
             };
        }
        
    } catch (error) {
        lastPrediction = { 
            prediction: 'LỖI', 
            reason: `Lỗi kết nối/xử lý API Game: ${error.message}`, 
            timestamp: Date.now() 
        };
    }
}

setInterval(updatePrediction, 5000); 
updatePrediction(); 

function getPrediction() {
    return lastPrediction;
}

module.exports = { getPrediction };
