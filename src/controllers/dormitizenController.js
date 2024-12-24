const Dormitizen = require('../models/dormitizen.js');

const getLoggedInUser = async (req, res) => {
    const user_id = req.user_id;

    try {
        const response = await Dormitizen.findAll({
            where: { dormitizen_id: user_id },
        });
        res.json({
            message: `Data laporan berhasil diambil`,
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getLoggedInUser,
};
