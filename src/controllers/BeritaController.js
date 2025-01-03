const Berita = require('../models/Berita.js');

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
        const response = await Berita.create(req.body);

        res.status(201).json({
            message: 'Berita berhasil dibuat',
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getAllBerita,
    createBerita,
};
