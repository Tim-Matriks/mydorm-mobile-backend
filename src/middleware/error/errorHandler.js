// Middleware untuk menangani error, seperti dari multer
const errorHandler = (err, req, res, next) => {
    if (err.message === 'FORMAT_SALAH') {
        return res.status(400).json({ error: 'Format file salah' });
    }

    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Ukuran file terlalu besar' });
    }

    if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({ error: 'Jumlah file terlalu banyak' });
    }

    return res.status(500).json({ error: 'Terjadi kesalahan pada server' });
};

module.exports = errorHandler;
