const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;


const Notifikasi = db.define('notification', {
    notif_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    judul: {
        type: DataTypes.STRING(100),
    },
    isi: {
        type: DataTypes.TEXT,
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