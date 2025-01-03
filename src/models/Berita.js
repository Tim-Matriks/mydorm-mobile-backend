const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Berita = db.define('berita', {
    berita_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    judul: DataTypes.STRING(100),
    isi: DataTypes.TEXT,
    kategori: DataTypes.STRING(50),
    helpdesk_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'helpdesk',
            key: 'helpdesk_id',
        },
    },
});

module.exports = Berita;
