const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Kamar = db.define('kamar', {
    kamar_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    nomor: DataTypes.STRING(3),
    status: DataTypes.ENUM('terbuka', 'terkunci'),
    gedung_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'gedung',
            key: 'gedung_id',
        },
    },
});

module.exports = Kamar;
