const LogKeluarMasuk = require('../models/LogKeluarMasuk.js');
const sequelize = require('../configs/database.js');

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

module.exports = {
    getAllLogKeluarMasukByUser,
    cekStatus,
    requestKeluar,
};
