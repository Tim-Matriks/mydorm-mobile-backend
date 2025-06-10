const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Informasi = db.define('informasi', {
    informasi_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    judul: { type: DataTypes.STRING(100), allowNull: false },
    isi: { type: DataTypes.TEXT, allowNull: false },
    kategori: { type: DataTypes.STRING(50), allowNull: false },
    gambar: { type: DataTypes.STRING, allowNull: false },
    penulis_id: {
        type: DataTypes.UUID,
        references: {
            model: 'user',
            key: 'user_id',
        },
        allowNull: false,
    },
});

module.exports = Informasi;
