const express = require('express');
const multer = require('multer');
const router = express.Router();
const { importUsers } = require('../utils/seeders/importUser');
const { importGedung } = require('../utils/seeders/importGedung');
const { assignUser } = require('../utils/seeders/assignUser');

const upload = multer({ dest: 'public/uploads/' });

router.post('/import-users', upload.single('file'), importUsers);
router.post('/import-gedung', upload.single('file'), importGedung);
router.get('/assign-kamar', assignUser);

module.exports = router;
