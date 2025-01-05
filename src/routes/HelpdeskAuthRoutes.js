const express = require('express');
const router = express.Router();

const registerController = require('../controllers/auth/helpdesk/RegisterController.js');
const loginController = require('../controllers/auth/helpdesk/LoginController.js');
const logoutController = require('../controllers/auth/helpdesk/LogoutController.js');

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/logout', logoutController);

module.exports = router;
