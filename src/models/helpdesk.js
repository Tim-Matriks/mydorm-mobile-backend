const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Helpdesk = db.define(
    'helpdesk',
    {
        helpdesk_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        nip: DataTypes.STRING,
        nama: DataTypes.STRING,
        refresh_token: DataTypes.STRING,
    },
    {
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Helpdesk;
