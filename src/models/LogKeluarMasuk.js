const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const LogKeluarMasuk = db.define('log_keluar_masuk', {
    log_keluar_masuk_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    waktu: DataTypes.DATE,
    aktivitas: DataTypes.ENUM('keluar', 'masuk'),
    status: DataTypes.ENUM('diterima', 'ditolak', 'pending'),
    dormitizen_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'dormitizen',
            key: 'dormitizen_id',
        },
    },
    senior_resident_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'senior_resident',
            key: 'senior_resident_id',
        },
    },
    helpdesk_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'helpdesk',
            key: 'helpdesk_id',
        },
    },
});

module.exports = LogKeluarMasuk;
