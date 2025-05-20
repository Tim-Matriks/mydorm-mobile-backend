const express = require('express');
const router = express.Router();

const LogKeluarMasukController = require('../controllers/LogKeluarMasukController');

router.get('/', LogKeluarMasukController.getAllLogKeluarMasukByUser);
router.get('/status', LogKeluarMasukController.cekStatus);
router.put('/status/:aksi/:id', LogKeluarMasukController.ubahStatus);
router.get('/request', LogKeluarMasukController.handleRequestKeluarMasuk);

module.exports = router;