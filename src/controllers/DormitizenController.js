const { Op } = require('sequelize');
const { Dormitizen, Helpdesk, Kamar, Gedung } = require('../models');

const findDormitizenByKamar = async (req, res) => {
    const { user_id, user_role } = req.loginData;
    const no_kamar = req.params.no_kamar;

    try {
        let me;
        let gedung_id;
        if (user_role == 'helpdesk') {
            me = await Helpdesk.findOne({
                where: { user_id },
                include: {
                    model: Gedung,
                    as: 'gedung',
                    attributes: { include: ['gedung_id'] },
                },
            });
            gedung_id = me.gedung.gedung_id;
        } else {
            me = await Dormitizen.findOne({
                where: { user_id },
                include: {
                    model: Kamar,
                    as: 'kamar',
                    attributes: { include: ['gedung_id'] },
                },
            });
            gedung_id = me.kamar.gedung_id;
        }

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
