const express = require('express');
const router = express.Router();
const {
    getLoggedInUser,
    setSR,
    findDormitizenByKamar,
} = require('../controllers/DormitizenController.js');

router.get('/', getLoggedInUser);
router.post('/set-sr', setSR);
router.get('/:no_kamar', findDormitizenByKamar);

module.exports = router;
