const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Helpdesk = db.define('helpdesk', {
    helpdesk_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nip: { type: DataTypes.STRING(18), allowNull: false },
    nama: { type: DataTypes.STRING(100), allowNull: false },
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
    gedung_id: {
        type: DataTypes.UUID,
        references: {
            model: 'gedung',
            key: 'gedung_id',
        },
    },
});

module.exports = Helpdesk;
