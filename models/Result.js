// models/Result.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); 

const Result = sequelize.define('Result', {
    result: { type: DataTypes.STRING, allowNull: false }, // P, B, hoặc T
    roundId: { type: DataTypes.INTEGER, allowNull: true }
}, {
    tableName: 'Results',
});

module.exports = Result;
