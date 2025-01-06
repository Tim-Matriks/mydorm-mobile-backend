const express = require('express');
const router = express.Router();

const { getUserKamarStatus } = require('../controllers/KamarController.js');

router.get('/status', getUserKamarStatus);

module.exports = router;
