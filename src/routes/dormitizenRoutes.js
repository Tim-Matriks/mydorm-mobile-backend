const express = require('express');
const router = express.Router();

const registerController = require('../controllers/auth/dormitizen/RegisterController.js');
const loginController = require('../controllers/auth/dormitizen/loginController.js');
// const refreshTokenController = require('../controllers/auth/refreshTokenController');
const logoutController = require('../controllers/auth/dormitizen/logoutController.js');

router.post('/register', registerController);
router.post('/login', loginController);
// router.get('/refresh', refreshTokenController);
router.get('/logout', logoutController);

module.exports = router;
