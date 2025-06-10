const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Gedung = db.define('gedung', {
    gedung_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    kode: { type: DataTypes.STRING(10), allowNull: false },
    nama: { type: DataTypes.STRING(10), allowNull: false },
});

module.exports = Gedung;
