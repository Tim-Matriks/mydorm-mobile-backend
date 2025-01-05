const Gedung = require('./Gedung');
const Helpdesk = require('./Helpdesk');
const Kamar = require('./Kamar');
const Dormitizen = require('./Dormitizen');
const SeniorResident = require('./SeniorResident');
const Berita = require('./Berita');
const Laporan = require('./Laporan');
const LogKeluarMasuk = require('./LogKeluarMasuk');
const Paket = require('./Paket');
const Pelanggaran = require('./Pelanggaran');

// Relasi tiap gedung punya beberapa helpdesk
Helpdesk.belongsTo(Gedung, {
    foreignKey: 'helpdesk_id',
});
Gedung.hasMany(Helpdesk, {
    foreignKey: 'helpdesk_id',
});

// Relasi tiap gedung punya beberapa helpdesk
Helpdesk.belongsTo(Gedung, {
    foreignKey: 'helpdesk_id',
});
Gedung.hasMany(Helpdesk, {
    foreignKey: 'helpdesk_id',
});

// Relasi dormitizen dapat menjadi SR
Dormitizen.hasOne(SeniorResident, {
    foreignKey: 'dormitizen_id',
});
SeniorResident.belongsTo(Dormitizen, {
    foreignKey: 'dormitizen_id',
});

// Relasi tiap dormitizen punya kamar
Dormitizen.belongsTo(Kamar, {
    foreignKey: 'kamar_id',
});
Kamar.hasMany(Dormitizen, {
    foreignKey: 'kamar_id',
});

// Relasi tiap gedung punya banyak kamar
Gedung.hasMany(Kamar, {
    foreignKey: 'gedung_id',
});
Kamar.belongsTo(Gedung, {
    foreignKey: 'gedung_id',
});

// Relasi tiap laporan dapat ditulis oleh dormitizen maupun helpdesk
Laporan.belongsTo(Dormitizen, {
    foreignKey: 'dormitizen_id',
});
Laporan.belongsTo(Helpdesk, {
    foreignKey: 'helpdesk_id',
});

// Relasi tiap laporan dapat dilihat detail dormitizen, SR, atau helpdesknya
LogKeluarMasuk.belongsTo(Dormitizen, {
    foreignKey: 'dormitizen_id',
});
LogKeluarMasuk.belongsTo(SeniorResident, {
    foreignKey: 'senior_resident_id',
});
LogKeluarMasuk.belongsTo(Helpdesk, {
    foreignKey: 'helpdesk_id',
});

// Relasi tiap paket punya penerima dan penanggung jawab
Paket.belongsTo(Dormitizen, {
    foreignKey: 'dormitizen_id',
});
Paket.belongsTo(Helpdesk, {
    foreignKey: 'penerima_paket',
    as: 'penerima paket',
});
Paket.belongsTo(Helpdesk, {
    foreignKey: 'penyerahan_paket',
    as: 'penyerahan paket',
});

// Relasi tiap pelanggaran punya pelanggar dan pelapor
Dormitizen.hasMany(Pelanggaran, { foreignKey: 'dormitizen_id' });
Pelanggaran.belongsTo(Dormitizen, {
    foreignKey: 'dormitizen_id',
});
SeniorResident.hasMany(Pelanggaran, { foreignKey: 'senior_resident_id' });
Pelanggaran.belongsTo(SeniorResident, {
    foreignKey: 'senior_resident_id',
});

// Relasi tiap berita dibuat oleh satu helpdesk
Berita.belongsTo(Helpdesk, {
    foreignKey: 'helpdesk_id',
});
Helpdesk.hasMany(Berita, {
    foreignKey: 'helpdesk_id',
});
