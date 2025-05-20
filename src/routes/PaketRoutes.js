const express = require('express');
const router = express.Router();

const uploadFotoPaket = require('../middleware/upload/imagePaket.js');

const {
    getAllPaket,
    getAllPaketByUser,
    createPaket,
    updatePaket,
    deletePaket,
} = require('../controllers/paketController.js');

router.get('/all', getAllPaket);
router.get('/', getAllPaketByUser);
router.post('/', uploadFotoPaket.single('gambar'), createPaket);
router.put('/:id', uploadFotoPaket.single('gambar'), updatePaket);
router.delete('/:id', deletePaket);

module.exports = router;
