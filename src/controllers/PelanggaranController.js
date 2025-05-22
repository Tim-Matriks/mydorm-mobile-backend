const { Pelanggaran, Dormitizen } = require('../models');
const userRoleDetails = require('../utils/userRoleDetail');

const getAllPelanggaran = async (req, res) => {
    try {
        const allPelanggaran = await Pelanggaran.findAll({
            include: [
                { model: Dormitizen, as: 'pelapor' },
                { model: Dormitizen, as: 'pelanggar' },
            ],
        });
        res.json({
            message: `Data semua pelanggaran berhasil diambil`,
            data: allPelanggaran,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:
                'Terjadi kesalahan saat mengambil daftar semua pelanggaran',
            errMsg: error.message,
        });
    }
};

const getPelanggaranById = async (req, res) => {
    const pelanggaran_id = req.params.id;

    try {
        const pelanggaran = await Pelanggaran.findAll({
            include: [
                { model: Dormitizen, as: 'pelapor' },
                { model: Dormitizen, as: 'pelanggar' },
            ],
            where: { pelanggaran_id },
        });
        res.json({
            message: `Data sebuah pelanggaran berhasil diambil`,
            data: pelanggaran,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil data pelanggaran',
            errMsg: error.message,
        });
    }
};

const getAllPelanggaranByUserId = async (req, res) => {
    const dormitizen_id = req.params.id;

    try {
        const pelanggaran = await Pelanggaran.findAll({
            include: [
                { model: Dormitizen, as: 'pelapor' },
                { model: Dormitizen, as: 'pelanggar' },
            ],
            where: { pelanggar_id: dormitizen_id },
        });
        res.json({
            message: `Data pelanggaran seorang dormitizen berhasil diambil`,
            data: pelanggaran,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:
                'Terjadi kesalahan saat mengambil data pelanggaran seorang dormitizen',
            errMsg: error.message,
        });
    }
};

const createPelanggaran = async (req, res) => {
    const { kategori, waktu, dormitizen_id } = req.body;
    const { user_id, user_role } = req.loginData;
    const { dormitizen_id: senior_resident_id } = await userRoleDetails(
        user_id,
        user_role
    );

    if (!kategori || !waktu || !dormitizen_id || !req.file?.filename) {
        return res.status(400).json({
            message: 'Semua field wajib diisi',
        });
    }

    try {
        const newPelanggaran = await Pelanggaran.create({
            kategori,
            waktu,
            pelapor_id: senior_resident_id,
            pelanggar_id: dormitizen_id,
            gambar: req.file.filename,
        });

        res.status(201).json({
            message: 'Data pelanggaran berhasil dibuat',
            data: newPelanggaran,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat menambah data pelanggaran',
            errMsg: error.message,
        });
    }
};

// const deletePelanggaran = async (req, res) => {
//     const user_type = req.user_type;
//     const { pelanggaran_id } = req.params;

//     try {
//         if (user_type != 'senior_resident') {
//             return res.status(403).json({
//                 message: 'Harus login sebagai senior resident',
//                 data: null,
//             });
//         }

//         await Pelanggaran.destroy({ where: { pelanggaran_id } });

//         res.status(200).json({
//             message: 'Pelanggaran berhasil dihapus',
//             data: null,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message, data: null });
//     }
// };

module.exports = {
    getAllPelanggaran,
    getPelanggaranById,
    getAllPelanggaranByUserId,
    createPelanggaran,
};
