const { Sequelize, DatabaseError } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const User = db.define('user', {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM,
        values: ['dormitizen', 'senior_resident', 'helpdesk'],
    },
    refresh_token: { type: DataTypes.STRING, allowNull: true },
});

module.exports = User;
