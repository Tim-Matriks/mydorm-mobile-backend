const express = require('express');
const router = express.Router();

const uploadFotoPelanggaran = require('../middleware/upload/imagePelanggaran.js');

const {
    getAllPelanggaran,
    getPelanggaranById,
    getAllPelanggaranByUserId,
    createPelanggaran,
    getAllPelanggaranByKamarId,
    deletePelanggaran,
    updatePelanggaran,
} = require('../controllers/PelanggaranController.js');

router.get('/', getAllPelanggaran);
router.get('/:id', getPelanggaranById);
router.get('/user/:id', getAllPelanggaranByUserId);
router.get('/kamar/:id', getAllPelanggaranByKamarId);
router.post('/', uploadFotoPelanggaran.single('file'), createPelanggaran);
router.put('/:id', uploadFotoPelanggaran.single('file'), updatePelanggaran);
router.delete('/:id', deletePelanggaran);

module.exports = router;
