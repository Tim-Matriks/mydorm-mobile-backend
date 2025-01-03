const Dormitizen = require('../models/Dormitizen.js');

const getLoggedInUser = async (req, res) => {
    const user_id = req.user_id;
    console.log(user_id);
    try {
        const response = await Dormitizen.findAll({
            attributes: { exclude: ['password', 'refresh_token'] },
            where: { dormitizen_id: user_id },
        });
        res.json({
            message: `Data user login berhasil diambil`,
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getLoggedInUser,
};
