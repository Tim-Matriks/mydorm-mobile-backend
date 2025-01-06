const { Op } = require('sequelize');
const Kamar = require('../models/Kamar.js');
const Dormitizen = require('../models/Dormitizen.js');
const Gedung = require('../models/Gedung.js');
const Helpdesk = require('../models/Helpdesk.js');

const getUserKamarStatus = async (req, res) => {
    const user_id = req.user_id;
    const user_type = req.user_type;

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

const getAllKamarStatus = async (req, res) => {
    const user_id = req.user_id;
    const user_type = req.user_type;

    try {
        if (user_type == 'dormitizen') {
            return res.status(403).json({
                message: 'Anda tidak boleh mengakses ini',
                data: null,
            });
        }

        let gedung_id = null;

        if (user_type == 'senior_resident') {
            const user = await Dormitizen.findOne({
                attributes: [],
                include: { model: Kamar },
                where: { dormitizen_id: user_id },
            });
            gedung_id = user.kamar.gedung_id;
        } else if (user_type == 'helpdesk') {
            const user = await Helpdesk.findOne({
                attributes: [],
                where: { helpdesk_id: user_id },
            });
            gedung_id = user.gedung_id;
        }

        const response = await Kamar.findAll({
            attributes: { exclude: ['created_at', 'updated_at'] },
            include: { model: Gedung, where: { gedung_id }, attributes: [] },
        });
        res.json({
            message: `Status kamar satu gedung berhasil diambil`,
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getUserKamarStatus,
    getAllKamarStatus,
};
