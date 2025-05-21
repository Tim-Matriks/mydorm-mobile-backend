const express = require('express');
const router = express.Router();

const {
    getAllPelanggaran,
    getPelanggaranById,
    getAllPelanggaranByUserId,
} = require('../controllers/PelanggaranController.js');

router.get('/', getAllPelanggaran);
router.get('/:id', getPelanggaranById);
router.get('/user/:id', getAllPelanggaranByUserId);
// router.post('/', createPelanggaran);
// router.delete('/:pelanggaran_id', deletePelanggaran);

module.exports = router;
