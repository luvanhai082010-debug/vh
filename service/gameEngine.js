// service/gameEngine.js
const Result = require('../models/Result'); 

const generateRandomResult = () => {
    const results = ['P', 'B', 'T']; 
    const randomIndex = Math.floor(Math.random() * results.length);
    return results[randomIndex];
};

const createNewRound = async () => {
    const result = generateRandomResult();
    const currentCount = await Result.count();

    const newRound = await Result.create({ 
        result: result,
        roundId: currentCount + 1
    });

    return newRound;
};

const getHistoryString = async () => {
    const results = await Result.findAll({
        order: [['createdAt', 'ASC']],
    });

    const historyString = results.map(r => r.result).join('');
    const count = results.length;

    return { results: historyString, count: count };
};

module.exports = { createNewRound, getHistoryString };
