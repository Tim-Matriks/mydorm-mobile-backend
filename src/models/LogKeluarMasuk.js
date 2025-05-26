const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const LogKeluarMasuk = db.define('log_keluar_masuk', {
    log_keluar_masuk_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    waktu: { type: DataTypes.DATE, allowNull: false },
    aktivitas: {
        type: DataTypes.ENUM,
        values: ['keluar', 'masuk'],
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['diterima', 'ditolak', 'pending'],
        allowNull: false,
    },
    dormitizen_id: {
        type: DataTypes.UUID,
        references: {
            model: 'dormitizen',
            key: 'dormitizen_id',
        },
    },
    pencatat_id: {
        type: DataTypes.UUID,
        references: {
            model: 'user',
            key: 'user_id',
        },
    },
});

module.exports = LogKeluarMasuk;
