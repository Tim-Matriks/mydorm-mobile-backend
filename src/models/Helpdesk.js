const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Helpdesk = db.define('helpdesk', {
    helpdesk_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    nip: DataTypes.STRING(18),
    nama: DataTypes.STRING(100),
    username: DataTypes.STRING(100),
    password: DataTypes.STRING(100),
    refresh_token: DataTypes.STRING,
    gedung_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'gedung',
            key: 'gedung_id',
        },
    },
});

module.exports = Helpdesk;
