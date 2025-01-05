const express = require('express');
const router = express.Router();

const {
    getAllPaket,
    getUserPaket,
} = require('../controllers/PaketController.js');

router.get('/all', getAllPaket);
router.get('/', getUserPaket);

module.exports = router;
