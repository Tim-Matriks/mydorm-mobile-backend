const express = require('express');
const router = express.Router();

const {
    getAllPelanggaran,
    createPelanggaran,
    deletePelanggaran,
} = require('../controllers/PelanggaranController.js');

router.get('/', getAllPelanggaran);
router.post('/', createPelanggaran);
router.delete('/:pelanggaran_id', deletePelanggaran);

module.exports = router;
