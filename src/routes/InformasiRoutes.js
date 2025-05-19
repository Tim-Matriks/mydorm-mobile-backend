const express = require('express');
const router = express.Router();

const {
    getAllInformasi,
} = require('../controllers/informasiController.js');

router.get('/', getAllInformasi);

module.exports = router;
