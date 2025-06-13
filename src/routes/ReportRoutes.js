const express = require('express');
const router = express.Router();
const { exportLogKeluarMasuk } = require('../controllers/ReportController');

router.get('/log-keluar-masuk', exportLogKeluarMasuk);

module.exports = router;
