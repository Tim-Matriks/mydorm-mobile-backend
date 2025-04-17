const Berita = require('../models/Berita.js');
const upload = require('../middleware/multer.js').single('gambar');

const getAllBerita = async (req, res) => {
    try {
        const response = await Berita.findAll();
        res.json({
            message: `Data berita berhasil diambil`,
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const createBerita = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            const berita = await Berita.build(req.body);
            berita.gambar = req.file?.filename;

            await berita.save();

            res.status(201).json({
                message: 'Berita berhasil dibuat',
                data: berita,
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getAllBerita,
    createBerita,
};
