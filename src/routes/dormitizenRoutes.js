const express = require('express');
const router = express.Router();
const {
    getLoggedInUser,
    setSR,
} = require('../controllers/DormitizenController.js');

router.get('/', getLoggedInUser);
router.post('/set-sr', setSR);

module.exports = router;
