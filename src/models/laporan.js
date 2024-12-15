const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Laporan = db.define(
    'laporan',
    {
        laporan_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        judul: DataTypes.STRING,
        isi: DataTypes.TEXT,
        dormitizen_id: {
            type: DataTypes.BIGINT,
            references: {
                model: 'dormitizen', // Nama tabel penjaga
                key: 'dormitizen_id',
            },
        },
        helpdesk_id: {
            type: DataTypes.BIGINT,
            references: {
                model: 'helpdesk', // Nama tabel penjaga
                key: 'helpdesk_id',
            },
        },
    },
    {
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

Laporan.associations = (models) => {
    Laporan.belongsTo(models.dormitizen, {
        foreignKey: 'dormitizen_id',
        as: 'dormitizen',
    });
};

module.exports = Laporan;
