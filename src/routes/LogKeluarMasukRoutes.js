const express = require('express');
const router = express.Router();

const LogKeluarMasukController = require('../controllers/LogKeluarMasukController');

router.get('/', LogKeluarMasukController.getAllLogKeluarMasukByUser);
router.get('/status', LogKeluarMasukController.cekStatus);
router.get('/keluar', LogKeluarMasukController.requestKeluar);
router.get('/masuk', LogKeluarMasukController.requestMasuk);
router.put('/status/:aksi/:id', LogKeluarMasukController.ubahStatus);

module.exports = router;
