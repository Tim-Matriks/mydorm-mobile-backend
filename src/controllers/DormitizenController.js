const { Op } = require('sequelize');
const { Dormitizen, Helpdesk, Kamar, Gedung } = require('../models');
const { getUserGedungId } = require('../utils/userRoleDetail');

const findDormitizenByKamar = async (req, res) => {
    const { user_id, user_role } = req.loginData;
    const no_kamar = req.params.no_kamar;

    try {
        const gedung_id = await getUserGedungId(user_id, user_role);

        const response = await Dormitizen.findAll({
            include: {
                model: Kamar,
                as: 'kamar',
                where: { [Op.and]: [{ nomor: no_kamar }, { gedung_id }] },
            },
        });
        return res.json({
            message: 'Berhasil mengambil dormitizen berdasarkan kamar',
            data: response,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:
                'Terjadi kesalahan saat mengambil dormitizen berdasarkan kamar',
            errMsg: error.message,
        });
    }
};

module.exports = {
    findDormitizenByKamar,
};
