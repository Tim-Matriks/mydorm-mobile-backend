const express = require('express');
const router = express.Router();

const laporanController = require('../controllers/LaporanController.js');

router.get('/', laporanController.getAllLaporanByUser);
router.post('/', laporanController.createLaporan);

module.exports = router;
