const express = require('express');
const router = express.Router();

const uploadFotoInformasi = require('../middleware/upload/imageInformasi.js');

const {
    getAllInformasi,
    createInformasi,
    updateInformasi,
    deleteInformasi,
} = require('../controllers/informasiController.js');

router.get('/', getAllInformasi);
router.post('/', uploadFotoInformasi.single('gambar'), createInformasi);
router.put('/:id', uploadFotoInformasi.single('gambar'), updateInformasi);
router.delete('/:id', deleteInformasi);

module.exports = router;
