const express = require('express');
const router = express.Router();

const {
    getAllPaket,
    getUserPaket,
    createPaket,
} = require('../controllers/PaketController.js');

router.get('/all', getAllPaket);
router.get('/', getUserPaket);
router.post('/', createPaket);

module.exports = router;
