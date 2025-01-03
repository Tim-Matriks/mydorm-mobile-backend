const express = require('express');
const router = express.Router();
const { getLoggedInUser } = require('../controllers/DormitizenController.js');

router.get('/', getLoggedInUser);

module.exports = router;
