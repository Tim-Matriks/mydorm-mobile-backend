const express = require('express');
const router = express.Router();

const {
    getAllLogKeluarMasuk,
    getAllLogKeluarMasukOfDormitizen,
    cekStatus,
    ubahStatus,
    handleRequestKeluarMasuk,
} = require('../controllers/LogKeluarMasukController');

router.get('/', getAllLogKeluarMasuk);
router.get('/me', getAllLogKeluarMasukOfDormitizen);
router.get('/status', cekStatus);
router.put('/status/:aksi/:id', ubahStatus);
router.post('/request', handleRequestKeluarMasuk);

module.exports = router;
