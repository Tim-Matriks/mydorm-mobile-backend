const Dormitizen = require('../models/Dormitizen.js');
const Kamar = require('../models/Kamar.js');
const SeniorResident = require('../models/SeniorResident.js');

const getLoggedInUser = async (req, res) => {
    const user_id = req.user_id;
    const user_type = req.user_type;

    try {
        const response = await Dormitizen.findAll({
            attributes: { exclude: ['password', 'refresh_token'] },
            where: { dormitizen_id: user_id },
            include: Kamar,
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
    const user_id = req.user_id;
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

module.exports = {
    getLoggedInUser,
    setSR,
};
