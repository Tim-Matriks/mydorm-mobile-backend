const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Gedung = db.define('gedung', {
    gedung_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    kode: DataTypes.STRING(10),
    nama: DataTypes.STRING(10),
});

module.exports = Gedung;
