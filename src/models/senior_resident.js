const { Sequelize } = require('sequelize');
const Dormitizen = require('../models/dormitizen.js');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const SeniorResident = db.define(
    'senior_resident',
    {
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
    },
    {
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

SeniorResident.belongsTo(Dormitizen, {
    foreignKey: 'dormitizen_id',
    as: 'dormitizen',
});

module.exports = SeniorResident;
