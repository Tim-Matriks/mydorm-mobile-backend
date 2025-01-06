const { Op } = require('sequelize');
const Kamar = require('../models/Kamar.js');
const Dormitizen = require('../models/Dormitizen.js');

const getUserKamarStatus = async (req, res) => {
    const user_id = req.user_id;

    try {
        if (user_type == 'helpdesk') {
            return res.status(403).json({
                message: 'Anda tidak boleh mengakses ini',
                data: null,
            });
        }

        const response = await Kamar.findOne({
            attributes: { exclude: ['created_at', 'updated_at'] },
            include: {
                model: Dormitizen,
                where: { dormitizen_id: user_id },
                attributes: ['nama'],
            },
        });
        res.json({
            message: `Status kamar user berhasil diambil`,
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getUserKamarStatus,
};
