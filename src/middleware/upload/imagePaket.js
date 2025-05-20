const createUploadMiddleware = require('./createUpload');
const uploadPaketImage = createUploadMiddleware({
    folder: 'paket',
    prefix: 'paket',
    maxSize: 5 * 1024 * 1024,
    allowedFileType: ['image/jpeg', 'image/png', 'image/jpg'],
});

module.exports = uploadPaketImage;
