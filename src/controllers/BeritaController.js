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
    const user_id = req.user_id;
    const user_type = req.type;

    try {
        upload(req, res, async (err) => {
            const berita = await Berita.build(req.body);
            berita.berita.gambar = req.file?.filename;
            if (user_type == 'helpdesk') {
                berita.helpdesk_id = user_id;
            } else if (user_type == 'senior_resident') {
                berita.senior_resident_id = user_id;
            }
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
