const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const SeniorResident = db.define('senior_resident', {
    senior_resident_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    dormitizen_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'dormitizen',
            key: 'dormitizen_id',
        },
    },
});

module.exports = SeniorResident;
