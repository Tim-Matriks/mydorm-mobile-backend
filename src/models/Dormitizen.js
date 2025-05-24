const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Dormitizen = db.define('dormitizen', {
    dormitizen_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nim: { type: DataTypes.STRING(12), allowNull: false },
    nama: { type: DataTypes.STRING(100), allowNull: false },
    prodi: { type: DataTypes.STRING(50), allowNull: false },
    agama: { type: DataTypes.STRING(20), allowNull: false },
    no_hp: { type: DataTypes.STRING(25), allowNull: false },
    no_hp_ortu: { type: DataTypes.STRING(25), allowNull: false },
    alamat_ortu: { type: DataTypes.STRING(100), allowNull: false },
    is_senior: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    gambar: {
        type: DataTypes.STRING,
        defaultValue: 'blank_profile_pic.png',
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: 'user',
            key: 'user_id',
        },
    },
    kamar_id: {
        type: DataTypes.UUID,
        references: {
            model: 'kamar',
            key: 'kamar_id',
        },
    },
});

module.exports = Dormitizen;
