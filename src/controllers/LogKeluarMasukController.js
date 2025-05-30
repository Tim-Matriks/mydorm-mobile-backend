const {
    LogKeluarMasuk,
    Dormitizen,
    Kamar,
    Helpdesk,
    User,
    Notifikasi,
} = require('../models');
const userRoleDetails = require('../utils/userRoleDetail.js');
const { Op } = require('sequelize');
const { sendNotification } = require('./NotifikasiController');

const getAllLogKeluarMasuk = async (req, res) => {
    const { user_id, user_role } = req.loginData;
    if (user_role == 'dormitizen')
        return res
            .status(403)
            .json({ message: 'Anda tidak boleh mengakses halaman ini' });
    try {
        let userDetail, gedung_id;
        if (user_role == 'helpdesk') {
            userDetail = await Helpdesk.findOne({
                where: { user_id },
            });
            gedung_id = userDetail.gedung_id;
        } else {
            userDetail = await Dormitizen.findOne({
                where: { user_id },
                include: {
                    model: Kamar,
                    as: 'kamar',
                },
            });
            gedung_id = userDetail.kamar.gedung_id;
        }

        const response = await LogKeluarMasuk.findAll({
            where: { '$dormitizen.kamar.gedung_id$': gedung_id },
            include: [
                {
                    model: Dormitizen,
                    as: 'dormitizen',
                    include: {
                        model: Kamar,
                        as: 'kamar',
                    },
                },
                {
                    model: User,
                    as: 'pencatat',
                    attributes: ['role'],
                    include: [{ model: Helpdesk }, { model: Dormitizen }],
                },
            ],
            order: [['created_at', 'DESC']],
        });

        const cleanedLogs = response.map((log) => {
            const pencatat = log.pencatat;

            let pencatatData = null;
            if (pencatat?.helpdesk) {
                pencatatData = {
                    role: 'helpdesk',
                    ...pencatat.helpdesk.toJSON(),
                };
            } else if (pencatat?.dormitizen) {
                pencatatData = {
                    role: 'senior_resident',
                    ...pencatat.dormitizen.toJSON(),
                };
            }

            return {
                ...log.toJSON(),
                pencatat: pencatatData,
            };
        });

        return res.json({
            message: 'Berhasil mengambil daftar log keluar masuk',
            data: cleanedLogs,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil daftar log keluar masuk',
            errMsg: error.message,
        });
    }
};

const getAllLogKeluarMasukOfDormitizen = async (req, res) => {
    const { user_id, user_role } = req.loginData;
    if (user_role == 'helpdesk')
        return res
            .status(403)
            .json({ message: 'Anda tidak boleh mengakses halaman ini' });

    try {
        const userDetail = await userRoleDetails(user_id, user_role);
        const response = await LogKeluarMasuk.findAll({
            where: { dormitizen_id: userDetail.dormitizen_id },
            include: [
                {
                    model: Dormitizen,
                    as: 'dormitizen',
                    include: {
                        model: Kamar,
                        as: 'kamar',
                    },
                },
                {
                    model: User,
                    as: 'pencatat',
                    attributes: ['role'],
                    include: [{ model: Helpdesk }, { model: Dormitizen }],
                },
            ],
            order: [['created_at', 'DESC']],
        });

        const cleanedLogs = response.map((log) => {
            const pencatat = log.pencatat;

            let pencatatData = null;
            if (pencatat?.helpdesk) {
                pencatatData = {
                    role: 'helpdesk',
                    ...pencatat.helpdesk.toJSON(),
                };
            } else if (pencatat?.dormitizen) {
                pencatatData = {
                    role: 'senior_resident',
                    ...pencatat.dormitizen.toJSON(),
                };
            }

            return {
                ...log.toJSON(),
                pencatat: pencatatData,
            };
        });

        return res.json({
            message: 'Berhasil mengambil daftar log keluar masuk',
            data: cleanedLogs,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil daftar log keluar masuk',
            errMsg: error.message,
        });
    }
};

const cekStatus = async (req, res) => {
    const { user_id, user_role } = req.loginData;
    if (user_role == 'helpdesk')
        return res
            .status(403)
            .json({ message: 'Anda tidak boleh mengakses halaman ini' });

    try {
        const userDetail = await userRoleDetails(user_id, user_role);
        const kamarId = userDetail.kamar_id;

        const penghuniKamar = await Dormitizen.findAll({
            where: { kamar_id: kamarId },
        });
        const kamarnya = await Kamar.findOne({
            where: { kamar_id: kamarId },
        });

        const penghuniKamarId = penghuniKamar.map(
            (dormitizen) => dormitizen.dormitizen_id
        );

        const requestTerbaru = await LogKeluarMasuk.findAll({
            where: { dormitizen_id: { [Op.or]: penghuniKamarId } },
            order: [['created_at', 'DESC']],
        });
        const hasPending = requestTerbaru.some(
            (item) => item.status === 'pending'
        );

        let status;
        if (hasPending) {
            status = 'pending';
        } else {
            if (kamarnya.status == 'terkunci') {
                status = 'Kamar terkunci';
            } else if (kamarnya.aktivitas == 'terbuka') {
                status = 'Kamar terbuka';
            }
        }
        res.json({
            message: 'Status kamar dormitizen berhasil diambil',
            status,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil status kamar dormitizen',
            errMsg: error.message,
        });
    }
};

const ubahStatus = async (req, res) => {
    const { user_id, user_role } = req.loginData;
    const log_id = req.params.id;
    const status = req.params.aksi;

    if (user_role == 'dormitizen')
        return res
            .status(403)
            .json({ message: 'Anda tidak boleh mengakses halaman ini' });

    try {
        const userDetail = await userRoleDetails(user_id, user_role);

        const log = await LogKeluarMasuk.findOne({
            where: { log_keluar_masuk_id: log_id },
        });
        if (!log) {
            return res
                .status(404)
                .json({ message: 'Log dengan id tersebut tidak ada' });
        }
        if (log.pencatat_id != null) {
            return res.status(400).json({ message: 'Log sudah diproses' });
        }
        await log.update({ status, pencatat_id: userDetail.user_id });

        const dormitizen = await Dormitizen.findOne({
            where: { dormitizen_id: log.dormitizen_id },
        });
        const kamar = await Kamar.findOne({
            where: { kamar_id: dormitizen.kamar_id },
        });
        penghuniKamar = await Dormitizen.findAll({
            where: { kamar_id: dormitizen.kamar_id },
            include: { model: User, attributes: ['fcm_token'] },
        });

        if (status == 'diterima') {
            const newStatus =
                kamar.status === 'terbuka' ? 'terkunci' : 'terbuka';
            await kamar.update({ status: newStatus });

            // Mengirim notifikasi kepada seluruh penghuni kamar yang memiliki fcm_token
            for (const penghuni of penghuniKamar) {
                const notifTitle = `Kamar ${
                    log.aktivitas === 'masuk' ? 'Terbuka' : 'Terkunci'
                }`;
                const notifBody = `Request ${log.aktivitas} dari penghuni telah diterima.`;

                await Notifikasi.create({
                    judul: notifTitle,
                    isi: notifBody,
                    user_id: penghuni.user_id,
                });
                if (penghuni.fcm_token) {
                    await sendNotification({
                        fcm_token: penghuni.user.fcm_token,
                        title: notifTitle,
                        body: notifBody,
                    });
                }
            }
        }
        return res.status(200).json({
            message: `Update berhasil. Request keluar-masuk ${status}`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat proses request',
            errMsg: error.message,
        });
    }
};

const handleRequestKeluarMasuk = async (req, res) => {
    const { user_id, user_role } = req.loginData;
    if (user_role == 'helpdesk')
        return res
            .status(403)
            .json({ message: 'Anda tidak boleh mengakses halaman ini' });

    try {
        const userDetail = await userRoleDetails(user_id, user_role);
        const kamarId = userDetail.kamar_id;

        // Cek apakah ada yang pending di kamar yang sama
        const penghuniKamar = await Dormitizen.findAll({
            where: { kamar_id: kamarId },
        });
        const idDormitizens = penghuniKamar.map((p) => p.dormitizen_id);
        const cekStatusLogKeluarMasuk = await LogKeluarMasuk.findAll({
            where: {
                dormitizen_id: idDormitizens,
                status: 'pending',
            },
        });

        if (cekStatusLogKeluarMasuk.length > 0) {
            return res.status(400).json({
                message:
                    'Terdapat request log keluar masuk dari kamar ini yang masih berstatus pending ',
            });
        }

        // Cari kamar
        const kamar = await Kamar.findOne({
            where: { kamar_id: kamarId },
        });
        const kamarStatus = kamar.status;

        const helpdesk = await Helpdesk.findAll({
            where: { gedung_id: kamar.gedung_id },
            include: { model: User, attributes: ['fcm_token'] },
        });
        for (const hd of helpdesk) {
            if (hd.user.fcm_token) {
                const notifTitle = 'Log Keluar Masuk';
                const notifBody = 'Terdapat Request Keluar-Masuk';

                await sendNotification({
                    fcm_token: hd.user.fcm_token,
                    title: notifTitle,
                    body: notifBody,
                });
            }
        }

        // Cek status sebelumnya untuk log berikutnya
        if (kamarStatus === 'terkunci') {
            const request = await LogKeluarMasuk.create({
                aktivitas: 'masuk',
                status: 'pending',
                dormitizen_id: userDetail.dormitizen_id,
            });

            return res.status(201).json({
                message: 'Request masuk berhasil dibuat',
                data: request,
            });
        } else if (kamarStatus === 'terbuka') {
            const request = await LogKeluarMasuk.create({
                aktivitas: 'keluar',
                status: 'pending',
                dormitizen_id: userDetail.dormitizen_id,
            });

            return res.status(201).json({
                message: 'Request keluar berhasil dibuat',
                data: request,
            });
        } else {
            return res.status(400).json({
                message: 'Status kamar tidak valid',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:
                'Terjadi kesalahan saat melakukan request log keluar masuk',
            errMsg: error.message,
        });
    }
};

module.exports = {
    getAllLogKeluarMasuk,
    getAllLogKeluarMasukOfDormitizen,
    cekStatus,
    ubahStatus,
    handleRequestKeluarMasuk,
};
