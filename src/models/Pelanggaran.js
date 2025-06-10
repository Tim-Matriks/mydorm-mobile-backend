const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Pelanggaran = db.define('pelanggaran', {
    pelanggaran_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    kategori: { type: DataTypes.STRING(100), allowNull: false },
    waktu: { type: DataTypes.DATE, allowNull: false },
    gambar: { type: DataTypes.STRING, allowNull: false },
    pelapor_id: {
        type: DataTypes.UUID,
        references: {
            model: 'dormitizen',
            key: 'dormitizen_id',
        },
    },
    pelanggar_id: {
        type: DataTypes.UUID,
        references: {
            model: 'dormitizen',
            key: 'dormitizen_id',
        },
    },
});

module.exports = Pelanggaran;
