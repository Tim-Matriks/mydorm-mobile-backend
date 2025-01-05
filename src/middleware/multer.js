const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime();

        const sanitizedOriginalName = file.originalname.replace(/\s+/g, '-');
        cb(null, `${timestamp}-${sanitizedOriginalName}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    } else {
        const errMsg = 'Hanya boleh upload gambar (jpeg, jpg, png)';
        req.fileValidationError = errMsg;
        return cb(new Error(errMsg), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1000 * 1000,
    },
});

module.exports = upload;
