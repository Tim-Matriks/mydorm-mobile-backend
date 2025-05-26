const express = require('express');
const router = express.Router();

const LogKeluarMasukController = require('../controllers/LogKeluarMasukController');

router.get('/', LogKeluarMasukController.getAllLogKeluarMasuk);
router.get('/me', LogKeluarMasukController.getAllLogKeluarMasukOfDormitizen);
// router.get('/status', LogKeluarMasukController.cekStatus);
// router.put('/status/:aksi/:id', LogKeluarMasukController.ubahStatus);
router.post('/request', LogKeluarMasukController.handleRequestKeluarMasuk);

module.exports = router;
