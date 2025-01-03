const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Paket = db.define('paket', {
    paket_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    status_pengambilan: DataTypes.ENUM('sudah', 'belum'),
    waktu_tiba: DataTypes.DATE,
    waktu_diambil: DataTypes.DATE,
    waktu_diambil: DataTypes.DATE,
    dormitizen_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'dormitizen',
            key: 'dormitizen_id',
        },
    },
    penerima_paket: {
        type: DataTypes.BIGINT,
        references: {
            model: 'helpdesk',
            key: 'helpdesk_id',
        },
    },
    penyerahan_paket: {
        type: DataTypes.BIGINT,
        references: {
            model: 'helpdesk',
            key: 'helpdesk_id',
        },
    },
    gambar: DataTypes.STRING,
});

module.exports = Paket;
