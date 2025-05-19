const express = require('express');
const router = express.Router();

const uploadFotoInformasi = require('../middleware/upload/imageInformasi.js');

const {
    getAllInformasi,
    createInformasi,
} = require('../controllers/informasiController.js');

router.get('/', getAllInformasi);
router.post('/', uploadFotoInformasi.single('file'), createInformasi);

module.exports = router;
