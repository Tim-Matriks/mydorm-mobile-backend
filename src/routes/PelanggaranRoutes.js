const express = require('express');
const router = express.Router();

const {
    getAllPelanggaran,
    createPelanggaran,
} = require('../controllers/PelanggaranController.js');

router.get('/', getAllPelanggaran);
router.post('/', createPelanggaran);

module.exports = router;
