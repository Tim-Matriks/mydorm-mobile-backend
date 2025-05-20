const { Paket, Dormitizen, Helpdesk, User } = require('../models');
const userRoleDetails = require('../utils/userRoleDetail');

const getAllPaket = async (req, res) => {
    try {
        // TODO: Rapihin output agar tidak kebanyakan data
        const allPaket = await Paket.findAll({
            include: [
                { model: Dormitizen, as: 'pemilik_paket' },
                { model: Helpdesk, as: 'penerima_paket' },
                { model: Helpdesk, as: 'penyerah_paket' },
            ],
        });

        return res.json({
            message: 'Berhasil mengambil daftar informasi',
            data: allPaket,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil daftar semua paket',
            errMsg: error.message,
        });
    }
};

const getAllPaketByUser = async (req, res) => {
    const { user_id, user_role } = req.loginData;
    const userDetail = await userRoleDetails(user_id, user_role);

    try {
        pemilik_paket_id = userDetail.dormitizen_id ?? null;

        const allPaket = await Paket.findAll({
            include: [
                { model: Dormitizen, as: 'pemilik_paket' },
                { model: Helpdesk, as: 'penerima_paket' },
                { model: Helpdesk, as: 'penyerah_paket' },
            ],
            where: { pemilik_paket_id },
        });

        res.json({
            message: `Data semua paket user berhasil diambil`,
            data: allPaket,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const createPaket = async (req, res) => {
    const { user_id, user_role } = req.loginData;
    const userDetail = await userRoleDetails(user_id, user_role);
    const { status_pengambilan, waktu_tiba, dormitizen_id } = req.body;

    if (
        !status_pengambilan ||
        !waktu_tiba ||
        !dormitizen_id ||
        !req.file?.filename
    ) {
        return res.status(400).json({
            message: 'Semua field wajib diisi',
        }); // TODO: Menambah cek file (simbol ?) juga di method lain
    }

    if (user_role != 'helpdesk') {
        return res.status(403).json({
            message: 'Hanya untuk helpdesk',
        });
    }

    try {
        penerima_paket_id = userDetail.helpdesk_id ?? null;
        const newPaket = await Paket.create({
            status_pengambilan,
            waktu_tiba,
            pemilik_paket_id: dormitizen_id,
            gambar: req.file.filename,
            penerima_paket_id,
        });
        res.status(201).json({
            message: 'Data paket berhasil dibuat',
            data: newPaket,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat menambah data paket',
            errMsg: error.message,
        });
    }
};

module.exports = {
    getAllPaket,
    getAllPaketByUser,
    createPaket,
    // getUserPaket,
};
