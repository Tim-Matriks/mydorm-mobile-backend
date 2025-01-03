const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Pelanggaran = db.define('pelanggaran', {
    pelanggaran_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    kategori: DataTypes.STRING(100),
    waktu: DataTypes.DATE,
    gambar: DataTypes.STRING,
    senior_resident_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'senior_resident',
            key: 'senior_resident_id',
        },
    },
    dormitizen_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'dormitizen',
            key: 'dormitizen_id',
        },
    },
});

module.exports = Pelanggaran;
