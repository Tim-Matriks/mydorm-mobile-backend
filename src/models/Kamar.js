const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Kamar = db.define('kamar', {
    kamar_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nomor: { type: DataTypes.STRING(3), allowNull: false },
    status: {
        type: DataTypes.ENUM('terbuka', 'terkunci'),
        defaultValue: 'terbuka',
    },
    gedung_id: {
        type: DataTypes.UUID,
        references: {
            model: 'gedung',
            key: 'gedung_id',
        },
    },
});

module.exports = Kamar;
