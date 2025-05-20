const express = require('express');
const router = express.Router();

const NotificationController = require('../controllers/NotificationController');

router.post('/saveToken', NotificationController.saveToken);
router.delete('/deleteToken', NotificationController.deleteToken);

module.exports = router;