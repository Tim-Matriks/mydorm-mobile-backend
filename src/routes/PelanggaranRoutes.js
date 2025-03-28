const express = require('express');
const router = express.Router();

const {
    getAllPelanggaran,
    getPelanggaranById,
    createPelanggaran,
    deletePelanggaran,
} = require('../controllers/PelanggaranController.js');

router.get('/', getAllPelanggaran);
router.get('/:dormitizen_id', getPelanggaranById);
router.post('/', createPelanggaran);
router.delete('/:pelanggaran_id', deletePelanggaran);

module.exports = router;
