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

module.exports = {
    getAllInformasi,
    createInformasi,
};
