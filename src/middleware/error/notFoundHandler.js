const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        error: 'Halaman tidak ditemukan. Periksa kembali URL atau metode request.',
    });
};

module.exports = notFoundHandler;
