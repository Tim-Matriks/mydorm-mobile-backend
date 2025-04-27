const express = require('express');
const router = express.Router();

const {
    getUserKamarStatus,
    getAllKamarStatus,
} = require('../controllers/KamarController.js');

router.get('/status', getUserKamarStatus);
router.get('/status/all', getAllKamarStatus);

module.exports = router;
