const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;


const Notifikasi = db.define('notification', {
    notif_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    dormitizen_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'dormitizen',
            key: 'dormitizen_id',
        },
        onDelete: 'CASCADE',
    },
});

module.exports = Notifikasi;