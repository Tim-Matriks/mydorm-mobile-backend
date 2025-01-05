const Dormitizen = require('../models/Dormitizen.js');
const Pelanggaran = require('../models/Pelanggaran.js');
const SeniorResident = require('../models/SeniorResident.js');

const getAllPelanggaran = async (req, res) => {
    const user_type = req.user_type;

    try {
        if (user_type != 'senior_resident') {
            return res.status(403).json({
                message: 'Harus login sebagai senior resident',
                data: null,
            });
        }
        const response = await Pelanggaran.findAll({
            include: {
                model: Dormitizen,
                attributes: {
                    exclude: [
                        'password',
                        'refresh_token',
                        'kamar_id',
                        'created_at',
                        'updated_at',
                    ],
                },
            },
        });
        res.json({
            message: `Data pelanggaran berhasil diambil`,
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const createPelanggaran = async (req, res) => {
    const user_type = req.user_type;
    const user_id = req.user_id;

    try {
        if (user_type != 'senior_resident') {
            return res.status(403).json({
                message: 'Harus login sebagai senior resident',
                data: null,
            });
        }
        const { senior_resident_id: sr_id } = await SeniorResident.findOne({
            where: { dormitizen_id: user_id },
        });

        const pelanggaran = await Pelanggaran.build(req.body);
        pelanggaran.senior_resident_id = sr_id;

        await pelanggaran.save();

        const response = pelanggaran;

        res.status(201).json({
            message: 'Pelanggaran berhasil dibuat',
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getAllPelanggaran,
    createPelanggaran,
};
