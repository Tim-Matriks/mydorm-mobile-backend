const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Notifikasi = db.define('notifikasi', {
    notifikasi_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    judul: {
        type: DataTypes.STRING(100),
    },
    isi: {
        type: DataTypes.TEXT,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'user',
            key: 'user_id',
        },
        onDelete: 'CASCADE',
    },
});

module.exports = Notifikasi;
