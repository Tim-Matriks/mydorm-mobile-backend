const { User, Dormitizen, Helpdesk } = require('../models');
const Informasi = require('../models/Informasi');

const getAllInformasi = async (req, res) => {
    try {
        const allInfo = await Informasi.findAll({
            order: [['created_at', 'DESC']],
            include: {
                model: User,
                as: 'penulis',
                attributes: ['user_id', 'gambar'],
                include: [
                    { model: Dormitizen, attributes: ['nama'] },
                    { model: Helpdesk, attributes: ['nama'] },
                ],
            },
        });

        const hasil = allInfo.map((info) => {
            const infoBaru = {
                informasi_id: info.informasi_id,
                judul: info.judul,
                isi: info.isi,
                kategori: info.kategori,
                gambar: info.gambar,
                created_at: info.created_at,
                updated_at: info.updated_at,
                foto_profil_penulis: info.penulis.gambar,
            };

            if (info.penulis.dormitizen != null) {
                infoBaru.nama_penulis = info.penulis.dormitizen.nama;
            } else {
                infoBaru.nama_penulis = info.penulis.helpdesk.nama;
            }
            return infoBaru;
        });

        return res.json({
            message: 'Berhasil mengambil daftar informasi',
            data: hasil,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil daftar informasi',
            errMsg: error.message,
        });
    }
};

const createInformasi = async (req, res) => {
    const { user_id } = req.loginData;
    const { judul, isi, kategori } = req.body;

    if (!judul || !isi || !kategori) {
        return res.status(400).json({
            message: 'Semua field wajib diisi',
        });
    }

    const opsiKategori = [
        'fasilitas asrama',
        'event asrama',
        'lingkungan asrama',
        'peraturan asrama',
    ];

    if (!opsiKategori.includes(kategori)) {
        return res.status(400).json({
            message: 'Kategori tidak valid',
        });
    }

    try {
        const newInformasi = await Informasi.create({
            judul,
            isi,
            kategori,
            gambar: req.file.filename,
            penulis_id: user_id,
        });
        res.status(201).json({
            message: 'Informasi berhasil dibuat',
            data: newInformasi,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat menambah informasi',
            errMsg: error.message,
        });
    }
};

const updateInformasi = async (req, res) => {
    const { judul, isi, kategori } = req.body;
    const informasi_id = req.params.id;

    const opsiKategori = [
        'fasilitas asrama',
        'event asrama',
        'lingkungan asrama',
        'peraturan asrama',
    ];

    if (kategori) {
        if (!opsiKategori.includes(kategori)) {
            return res.status(400).json({
                message: 'Kategori tidak valid',
            });
        }
    }

    try {
        const oldInformasi = await Informasi.findByPk(informasi_id);

        if (!oldInformasi) {
            return res.status(404).json({
                message: 'Data informasi tidak ditemukan',
            });
        }

        let imagePath = oldInformasi.image;
        if (req.file) {
            if (oldInformasi.image) {
                const oldPath = path.join(
                    __dirname,
                    '..',
                    'uploads/images/informasi',
                    oldInformasi.image
                );
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            imagePath = req.file.filename;
        }

        await oldInformasi.update({
            judul,
            isi,
            kategori,
            gambar: imagePath,
        });

        res.status(200).json({
            message: 'Informasi berhasil diubah',
            data: oldInformasi,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat mengubah informasi',
            errMsg: error.message,
        });
    }
};

module.exports = {
    getAllInformasi,
    createInformasi,
    updateInformasi,
};
