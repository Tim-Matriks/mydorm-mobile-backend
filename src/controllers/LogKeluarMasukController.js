const LogKeluarMasuk = require('../models/LogKeluarMasuk.js');
const sequelize = require('../configs/database.js');
const SeniorResident = require('../models/SeniorResident.js');

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
            message: `Update berhasil. Request keluar masuk ${status}`,
            data: log,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getAllLogKeluarMasukByUser,
    cekStatus,
    requestKeluar,
    requestMasuk,
    ubahStatus,
};
