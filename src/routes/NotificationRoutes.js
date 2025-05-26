const express = require('express');
const router = express.Router();

const NotificationController = require('../controllers/NotificationController');

router.post('/saveTokenDormitizen', NotificationController.saveTokenDormitizen);
router.delete('/deleteTokenDormitizen', NotificationController.deleteTokenDormitizen);
router.post('/saveTokenHelpdesk', NotificationController.saveTokenHelpdesk);
router.delete('/deleteTokenHelpdesk', NotificationController.deleteTokenHelpdesk);
router.get('/dormitizen', NotificationController.getAllNotificationByUser)


module.exports = router;