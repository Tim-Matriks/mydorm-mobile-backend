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
    gambar: {
        type: DataTypes.STRING,
        defaultValue: 'blank_profile_pic.png',
        allowNull: false,
    },

    refresh_token: DataTypes.STRING,
});

module.exports = User;
