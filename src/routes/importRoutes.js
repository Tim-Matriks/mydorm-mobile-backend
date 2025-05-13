const express = require('express');
const multer = require('multer');
const router = express.Router();
const { importUsers } = require('../utils/seeders/importUser');

const upload = multer({ dest: 'public/uploads/' });

router.post('/import-users', upload.single('file'), importUsers);

module.exports = router;
