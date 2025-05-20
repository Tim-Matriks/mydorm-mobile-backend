const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Paket = db.define('paket', {
    paket_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    status_pengambilan: { type: DataTypes.ENUM, values: ['sudah', 'belum'] },
    waktu_tiba: { type: DataTypes.DATE, allowNull: false },
    waktu_diambil: { type: DataTypes.DATE },
    pemilik_paket_id: {
        type: DataTypes.UUID,
        references: {
            model: 'dormitizen',
            key: 'dormitizen_id',
        },
        allowNull: false,
    },
    penerima_paket_id: {
        type: DataTypes.UUID,
        references: {
            model: 'helpdesk',
            key: 'helpdesk_id',
        },
        allowNull: false,
    },
    penyerah_paket_id: {
        type: DataTypes.UUID,
        references: {
            model: 'helpdesk',
            key: 'helpdesk_id',
        },
    },
    gambar: DataTypes.STRING,
});

module.exports = Paket;
