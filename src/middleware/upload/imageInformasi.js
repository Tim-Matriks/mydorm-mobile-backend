const createUploadMiddleware = require('./createUpload');
const uploadProductImage = createUploadMiddleware({
    folder: 'informasi',
    prefix: 'informasi',
    maxSize: 5 * 1024 * 1024,
    allowedFileType: ['image/jpeg', 'image/png', 'image/jpg'],
});

module.exports = uploadProductImage;
