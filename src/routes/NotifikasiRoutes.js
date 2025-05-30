const express = require('express');
const router = express.Router();

const {
    saveToken,
    deleteToken,
    getAllNotificationByUser,
} = require('../controllers/NotifikasiController');

router.post('/saveToken', saveToken);
router.delete('/deleteToken', deleteToken);
router.get('/me', getAllNotificationByUser);

module.exports = router;
