const express = require('express');
const router = express.Router();

const {
    getAllLogKeluarMasuk,
    getAllLogKeluarMasukOfDormitizen,
    cekStatus,
    ubahStatus,
    handleRequestKeluarMasuk,
    tambahLogManual,
} = require('../controllers/LogKeluarMasukController');

router.get('/', getAllLogKeluarMasuk);
router.get('/me', getAllLogKeluarMasukOfDormitizen);
router.get('/status', cekStatus);
router.put('/status/:aksi/:id', ubahStatus);
router.post('/request', handleRequestKeluarMasuk);
router.post('/tambah', tambahLogManual);

module.exports = router;
