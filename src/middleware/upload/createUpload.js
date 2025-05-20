const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs');

function createUploadMiddleware({ folder, prefix, maxSize, allowedFileType }) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = `./public/images/${folder}`;
            fs.mkdirSync(dir, { recursive: true });
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const timestamp = dayjs().format('YYYYMMDDHHmmss');
            const uniqueName = `${prefix}-${timestamp}${ext}`;
            cb(null, uniqueName);
        },
    });

    return multer({
        storage,
        limits: { fileSize: maxSize, files: 1 },
        fileFilter: (req, file, cb) => {
            const allowed = allowedFileType;
            if (allowed.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('FORMAT_SALAH'));
            }
        },
    });
}

module.exports = createUploadMiddleware;
