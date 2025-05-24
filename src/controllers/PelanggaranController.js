const { Pelanggaran, Dormitizen } = require('../models');
const deleteFile = require('../utils/fileHelpers');
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

const getAllPelanggaranByKamarId = async (req, res) => {
    const kamar_id = req.params.id;

    try {
        const pelanggaran = await Pelanggaran.findAll({
            include: [
                { model: Dormitizen, as: 'pelapor' },
                { model: Dormitizen, as: 'pelanggar', where: { kamar_id } },
            ],
        });
        res.json({
            message: `Data pelanggaran dormitizen sekamar berhasil diambil`,
            data: pelanggaran,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:
                'Terjadi kesalahan saat mengambil data pelanggaran dormitizen sekamar',
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

const updatePelanggaran = async (req, res) => {
    const pelanggaran_id = req.params.id;
    const { kategori, waktu, dormitizen_id } = req.body;

    try {
        const oldPelanggaran = await Pelanggaran.findByPk(pelanggaran_id);

        if (!oldPelanggaran) {
            deleteFile('images/pelanggaran', req.file?.filename);

            return res.status(404).json({
                message: 'Data pelanggaran tidak ditemukan',
            });
        }

        let imagePath = oldPelanggaran.gambar;
        if (req.file) {
            deleteFile('images/pelanggaran', oldPelanggaran.gambar);
            imagePath = req.file.filename;
        }

        await oldPelanggaran.update({
            kategori,
            waktu,
            pelanggar_id: dormitizen_id,
            gambar: imagePath,
        });

        res.status(200).json({
            message: 'Data pelanggaran berhasil diubah',
            data: oldPelanggaran,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat mengubah data pelanggaran',
            errMsg: error.message,
        });
    }
};

const deletePelanggaran = async (req, res) => {
    const pelanggaran_id = req.params.id;

    try {
        const pelanggaran = await Pelanggaran.findByPk(pelanggaran_id);

        if (!pelanggaran) {
            return res.status(404).json({
                message: 'Data pelanggaran tidak ditemukan',
            });
        }

        deleteFile('images/pelanggaran', pelanggaran.gambar);
        await pelanggaran.destroy();

        res.status(200).json({
            message: 'Pelanggaran berhasil dihapus',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat menghapus pelanggaran',
            errMsg: error.message,
        });
    }
};

module.exports = {
    getAllPelanggaran,
    getPelanggaranById,
    getAllPelanggaranByUserId,
    getAllPelanggaranByKamarId,
    createPelanggaran,
    updatePelanggaran,
    deletePelanggaran,
};
