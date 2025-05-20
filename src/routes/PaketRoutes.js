const express = require('express');
const router = express.Router();

const uploadFotoPaket = require('../middleware/upload/imagePaket.js');

const {
    getAllPaket,
    getAllPaketByUser,
    createPaket,
} = require('../controllers/paketController.js');

router.get('/all', getAllPaket);
router.get('/', getAllPaketByUser);
router.post('/', uploadFotoPaket.single('gambar'), createPaket);

module.exports = router;
