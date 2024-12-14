const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Dormitizen = db.define(
    'dormitizen',
    {
        dormitizen_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        nim: DataTypes.STRING,
        nama: DataTypes.STRING,
        prodi: DataTypes.STRING,
        agama: DataTypes.STRING,
        no_hp: DataTypes.STRING,
        no_hp_ortu: DataTypes.STRING,
        alamat_ortu: DataTypes.STRING,
        gambar: DataTypes.STRING,
        refresh_token: DataTypes.STRING,
    },
    {
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Dormitizen;
