const LogKeluarMasuk = require('../models/LogKeluarMasuk.js');
const sequelize = require('../configs/database.js');
const Dormitizen = require('../models/Dormitizen.js');
const Kamar = require('../models/Kamar');

const getAllLogKeluarMasukByUser = async (req, res) => {
    const user_id = req.user_id;

    try {
        const response = await LogKeluarMasuk.findAll({
            where: { dormitizen_id: user_id },
        });
        res.json({
            message: `Data log keluar masuk berhasil diambil`,
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const cekStatus = async (req, res) => {
    const user_id = req.user_id;

    try {
        if (user_type == 'helpdesk') {
            return res.status(403).json({
                message: 'Anda tidak boleh mengakses ini',
                data: null,
            });
        }

        const requestTerbaru = await LogKeluarMasuk.findOne({
            where: { dormitizen_id: user_id },
            order: [['created_at', 'DESC']],
        });
        let status;
        if (requestTerbaru.status == 'pending') {
            status = 'pending';
        } else {
            if (requestTerbaru.aktivitas == 'keluar') {
                status = 'diluar gedung';
            } else if (requestTerbaru.aktivitas == 'masuk') {
                status = 'dalam gedung';
            }
        }
        res.json({ message: 'Status dormitizen berhasil diambil', status });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const requestKeluar = async (req, res) => {
    const user_id = req.user_id;

    try {
        if (user_type == 'helpdesk') {
            return res.status(403).json({
                message: 'Anda tidak boleh mengakses ini',
                data: null,
            });
        }

        const requestKeluar = await LogKeluarMasuk.create({
            waktu: sequelize.literal('CURRENT_TIMESTAMP'),
            aktivitas: 'keluar',
            status: 'pending',
            dormitizen_id: user_id,
        });

        res.status(201).json({
            message: 'Request keluar berhasil dibuat',
            data: requestKeluar,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const requestMasuk = async (req, res) => {
    const user_id = req.user_id;

    try {
        if (user_type == 'helpdesk') {
            return res.status(403).json({
                message: 'Anda tidak boleh mengakses ini',
                data: null,
            });
        }

        const requestMasuk = await LogKeluarMasuk.create({
            waktu: sequelize.literal('CURRENT_TIMESTAMP'),
            aktivitas: 'masuk',
            status: 'pending',
            dormitizen_id: user_id,
        });

        res.status(201).json({
            message: 'Request masuk berhasil dibuat',
            data: requestMasuk,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const ubahStatus = async (req, res) => {
    const user_id = req.user_id;
    const log_id = req.params.id;
    const status = req.params.aksi;
    const user_type = req.user_type;

    try {
        if (user_type == 'dormitizen') {
            return res.status(403).json({
                message: 'Anda tidak boleh mengakses ini',
                data: null,
            });
        }

        if (user_type == 'senior_resident') {
            const { senior_resident_id } = await SeniorResident.findOne({
                where: { dormitizen_id: user_id },
            });
            value = { status, senior_resident_id };
        } else if (user_type == 'helpdesk') {
            value = { status, helpdesk_id: user_id };
        }

        const log = await LogKeluarMasuk.update(value, {
            where: { log_keluar_masuk_id: log_id },
        });

        res.status(200).json({
            message: `Update berhasil. Request keluar-masuk ${status}`,
            data: log,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, data: null });
    }
};

const handleRequestKeluarMasuk = async (req, res) => {
    const user_id = req.user_id;

    try {
        // Step 1: Cari Dormitizen
        const user = await Dormitizen.findOne({
            where: { dormitizen_id: user_id },
        });

        if (!user) {
            return res
                .status(404)
                .json({ message: 'User tidak ditemukan', data: null });
        }

        // Step 2: Ambil kamar_id dari Dormitizen
        const kamarId = user.kamar_id;

        if (!kamarId) {
            return res
                .status(400)
                .json({ message: 'User belum memiliki kamar', data: null });
        }

        // Step 3: Cari Kamar berdasarkan kamar_id
        const kamar = await Kamar.findOne({
            where: { kamar_id: kamarId },
        });

        if (!kamar) {
            return res
                .status(404)
                .json({ message: 'Kamar tidak ditemukan', data: null });
        }

        const kamarStatus = kamar.status; // 'terkunci' atau 'terbuka'

        // Step 4: Lanjutkan logika request keluar/masuk
        if (kamarStatus === 'terkunci') {
            // Request masuk
            const request = await LogKeluarMasuk.create({
                waktu: sequelize.literal('CURRENT_TIMESTAMP'),
                aktivitas: 'masuk',
                status: 'pending',
                dormitizen_id: user_id,
            });

            res.status(201).json({
                message: 'Request masuk berhasil dibuat',
                data: request,
            });
        } else if (kamarStatus === 'terbuka') {
            // Request keluar
            const request = await LogKeluarMasuk.create({
                waktu: sequelize.literal('CURRENT_TIMESTAMP'),
                aktivitas: 'keluar',
                status: 'pending',
                dormitizen_id: user_id,
            });

            res.status(201).json({
                message: 'Request keluar berhasil dibuat',
                data: request,
            });
        } else {
            res.status(400).json({
                message: 'Status kamar tidak valid',
                data: null,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getAllLogKeluarMasukByUser,
    cekStatus,
    requestKeluar,
    requestMasuk,
    ubahStatus,
    handleRequestKeluarMasuk,
};
