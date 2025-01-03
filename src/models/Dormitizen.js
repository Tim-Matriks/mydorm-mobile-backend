const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Dormitizen = db.define('dormitizen', {
    dormitizen_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    nim: DataTypes.STRING(15),
    nama: DataTypes.STRING(100),
    username: DataTypes.STRING(100),
    password: DataTypes.STRING(100),
    prodi: DataTypes.STRING(50),
    agama: DataTypes.STRING(20),
    no_hp: DataTypes.STRING(25),
    no_hp_ortu: DataTypes.STRING(25),
    alamat_ortu: DataTypes.STRING(100),
    gambar: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    kamar_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'kamar',
            key: 'kamar_id',
        },
    },
});

module.exports = Dormitizen;
