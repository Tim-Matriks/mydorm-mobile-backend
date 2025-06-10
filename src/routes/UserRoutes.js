const express = require('express');
const router = express.Router();

const { getLoggedInUser } = require('../controllers/UserController.js');

router.get('/me', getLoggedInUser);

module.exports = router;
