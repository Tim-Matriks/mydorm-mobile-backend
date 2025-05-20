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
router.post('/', uploadFotoInformasi.single('file'), createInformasi);
router.put('/:id', uploadFotoInformasi.single('file'), updateInformasi);
router.delete('/:id', deleteInformasi);

module.exports = router;
