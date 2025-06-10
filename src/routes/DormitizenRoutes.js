const express = require('express');
const router = express.Router();
const {
    findDormitizenByKamar,
} = require('../controllers/DormitizenController.js');

router.get('/:no_kamar', findDormitizenByKamar);

module.exports = router;
