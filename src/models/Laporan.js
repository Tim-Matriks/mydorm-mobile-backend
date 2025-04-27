const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Laporan = db.define('laporan', {
    laporan_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    judul: DataTypes.STRING,
    isi: DataTypes.TEXT,
    dormitizen_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'dormitizen',
            key: 'dormitizen_id',
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

module.exports = Laporan;
