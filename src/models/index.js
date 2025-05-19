const Sequelize = require('sequelize');
const db = require('../configs/database');

const User = require('./User');
const Gedung = require('./Gedung');
const Kamar = require('./Kamar');
const Dormitizen = require('./Dormitizen');
const Helpdesk = require('./Helpdesk');
const Informasi = require('./Informasi');

module.exports = {
    Sequelize,
    db,
    User,
    Gedung,
    Kamar,
    Dormitizen,
    Helpdesk,
};

// Tiap user merupakan seorang dormitizen atau helpdesk
User.hasOne(Dormitizen, {
    foreignKey: 'user_id',
});
User.hasOne(Helpdesk, {
    foreignKey: 'user_id',
});
Dormitizen.belongsTo(User, {
    foreignKey: 'user_id',
});
Helpdesk.belongsTo(User, {
    foreignKey: 'user_id',
});

// Dalam satu gedung, ada banyak kamar
Gedung.hasMany(Kamar, {
    foreignKey: 'gedung_id',
    as: 'kamar_pada_gedung',
});
// Tiap kamar berada dalam sebuah gedung
Kamar.belongsTo(Gedung, {
    foreignKey: 'gedung_id',
    as: 'gedung',
});

// Dalam satu kamar, ada beberapa dormitizen
Kamar.hasMany(Dormitizen, {
    foreignKey: 'kamar_id',
    as: 'berada_di_kamar',
});
// Tiap dormitizen tinggal dalam sebuah kamar
Dormitizen.belongsTo(Kamar, {
    foreignKey: 'kamar_id',
    as: 'kamar',
});

User.hasMany(Informasi, {
    foreignKey: 'penulis_id',
    as: 'membuat informasi',
});
Informasi.belongsTo(User, {
    foreignKey: 'penulis_id',
    as: 'penulis',
});
