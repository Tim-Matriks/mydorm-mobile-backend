const express = require('express');
const router = express.Router();

const {
    getAllBerita,
    createBerita,
} = require('../controllers/BeritaController.js');

router.get('/', getAllBerita);
router.post('/', createBerita);

module.exports = router;
