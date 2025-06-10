const createUploadMiddleware = require('./createUpload');
const uploadPelanggaranImage = createUploadMiddleware({
    folder: 'pelanggaran',
    prefix: 'pelanggaran',
    maxSize: 5 * 1024 * 1024,
    allowedFileType: ['image/jpeg', 'image/png', 'image/jpg'],
});

module.exports = uploadPelanggaranImage;
