const {
    Paket,
    Dormitizen,
    Helpdesk,
    User,
    Kamar,
    Notifikasi,
} = require('../models');
const deleteFile = require('../utils/fileHelpers');
const userRoleDetails = require('../utils/userRoleDetail');
const dayjs = require('dayjs');
const { sendNotification } = require('./NotifikasiController');

const getAllPaket = async (req, res) => {
    try {
        // TODO: Rapihin output agar tidak kebanyakan data
        const allPaket = await Paket.findAll({
            include: [
                {
                    model: Dormitizen,
                    as: 'pemilik_paket',
                    include: {
                        model: Kamar,
                        as: 'kamar',
                        attributes: ['nomor'],
                    },
                },
                { model: Helpdesk, as: 'penerima_paket' },
                { model: Helpdesk, as: 'penyerah_paket' },
            ],
            order: [['created_at', 'DESC']],
        });

        return res.json({
            message: 'Berhasil mengambil daftar paket',
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
            order: [['created_at', 'DESC']],
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

        const dormTarget = await Dormitizen.findByPk(dormitizen_id, {
            attributes: ['nama'],
            include: { model: User, attributes: ['fcm_token', 'user_id'] },
        });
        // return res.json(dormTarget);

        await Notifikasi.create({
            judul: 'Paket Baru Telah Diterima',
            isi: `Halo ${dormTarget.nama}, ada paket baru untukmu!`,
            user_id: dormTarget.user.user_id,
        });

        if (dormTarget?.user.fcm_token) {
            try {
                await sendNotification({
                    fcm_token: dormTarget.user.fcm_token,
                    title: 'Paket Baru Telah Diterima',
                    body: `Halo ${dormTarget.nama}, ada paket baru untukmu!`,
                });
            } catch (notifErr) {
                console.error('Gagal kirim notifikasi:', notifErr.message);
            }
        }

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

const updatePaket = async (req, res) => {
    const paket_id = req.params.id;
    const { user_id, user_role } = req.loginData;
    const userDetail = await userRoleDetails(user_id, user_role);

    if (user_role != 'helpdesk') {
        return res.status(403).json({
            message: 'Hanya untuk helpdesk',
        });
    }

    try {
        penyerah_paket_id = userDetail.helpdesk_id ?? null;
        const oldPaket = await Paket.findByPk(paket_id);

        if (!oldPaket) {
            return res.status(404).json({
                message: 'Data paket tidak ditemukan',
            });
        }

        await oldPaket.update({
            waktu_diambil: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            status_pengambilan: 'sudah',
            penyerah_paket_id,
        });

        res.status(200).json({
            message: 'Paket berhasil diubah',
            data: oldPaket,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat mengubah paket',
            errMsg: error.message,
        });
    }
};

const deletePaket = async (req, res) => {
    const paket_id = req.params.id;

    try {
        const paket = await Paket.findByPk(paket_id);

        if (!paket) {
            return res.status(404).json({
                message: 'Data paket tidak ditemukan',
            });
        }

        deleteFile('images/paket', paket.gambar);
        await paket.destroy();

        res.status(200).json({
            message: 'Paket berhasil dihapus',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat menghapus paket',
            errMsg: error.message,
        });
    }
};

module.exports = {
    getAllPaket,
    getAllPaketByUser,
    createPaket,
    updatePaket,
    deletePaket,
};
