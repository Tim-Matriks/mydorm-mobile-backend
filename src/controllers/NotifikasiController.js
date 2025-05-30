const { User, Notifikasi } = require('../models/index.js');
const admin = require('../utils/firebase.js');

const saveToken = async (req, res) => {
    const { user_id } = req.loginData;
    const { fcm_token } = req.body;

    if (!fcm_token) {
        return res.status(400).json({ message: 'fcm token wajib diisi' });
    }

    try {
        await User.update({ fcm_token }, { where: { user_id } });

        return res.status(200).json({
            message: 'Token berhasil disimpan',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat menambahkan fcm token',
            errMsg: error.message,
        });
    }
};

const deleteToken = async (req, res) => {
    const { user_id } = req.loginData;

    try {
        await User.update({ fcm_token: null }, { where: { user_id } });

        return res.status(200).json({ message: 'FCM token berhasil dihapus' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat menghapus fcm token',
        });
    }
};

const sendNotification = async ({ fcm_token, title, body }) => {
    if (!title) {
        throw new Error('title harus diisi');
    }
    if (!body) {
        throw new Error('body harus diisi');
    }
    if (!fcm_token) {
        throw new Error('Semua field wajib diisi');
    }

    const message = {
        token: fcm_token,
        notification: {
            title,
            body,
        },
    };

    // Kirim notifikasi
    return await admin.messaging().send(message);
};

const getAllNotificationByUser = async (req, res) => {
    const { user_id } = req.loginData;

    try {
        const notifikasi = await Notifikasi.findAll({
            where: { user_id },
        });
        return res.json({
            message: 'Data notifikasi berhasil diambil',
            data: notifikasi,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil data notifikasi',
        });
    }
};

module.exports = {
    saveToken,
    deleteToken,
    sendNotification,
    getAllNotificationByUser,
};
