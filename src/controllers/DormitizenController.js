const { Op } = require('sequelize');
const Dormitizen = require('../models/Dormitizen.js');
const Gedung = require('../models/Gedung.js');
const Kamar = require('../models/Kamar.js');
const SeniorResident = require('../models/SeniorResident.js');

const getLoggedInUser = async (req, res) => {
    const user_id = req.user_id;
    const user_type = req.user_type;

    try {
        const response = await Dormitizen.findAll({
            attributes: {
                exclude: [
                    'password',
                    'refresh_token',
                    'kamar_id',
                    'created_at',
                    'updated_at',
                ],
            },
            where: { dormitizen_id: user_id },
            include: {
                model: Kamar,
                attributes: {
                    exclude: ['created_at', 'updated_at', 'gedung_id'],
                },
                include: {
                    model: Gedung,
                    attributes: { exclude: ['created_at', 'updated_at'] },
                },
            },
        });
        res.json({
            message: `Data user login berhasil diambil`,
            user_type,
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const setSR = async (req, res) => {
    const user_type = req.user_type;

    try {
        const response = await SeniorResident.create(req.body);
        res.json({
            message: `Data SR berhasil dibuat`,
            user_type,
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

// get user by kamar -> array of user
// get user by id -> user
// include kamar ketika get user

const findDormitizenByKamar = async (req, res) => {
    const user_id = req.user_id;
    const no_kamar = req.params.no_kamar;

    try {
        const data_SR = await SeniorResident.findOne({
            where: { dormitizen_id: user_id },
            include: {
                model: Dormitizen,
                include: {
                    model: Kamar,
                    attributes: { include: ['gedung_id'] },
                },
            },
        });
        const gedung_id = data_SR.dormitizen.kamar.gedung_id;

        const response = await Dormitizen.findAll({
            include: {
                model: Kamar,
                where: { [Op.and]: [{ nomor: no_kamar }, { gedung_id }] },
            },
        });
        return res.json({ response });
        res.json({
            message: `Data SR berhasil dibuat`,
            user_type,
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getLoggedInUser,
    setSR,
    findDormitizenByKamar,
};
