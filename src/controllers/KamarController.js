const { Dormitizen, Helpdesk, Kamar, Gedung } = require('../models');

const getUserKamarStatus = async (req, res) => {
    const { user_id, user_role } = req.loginData;

    try {
        const response = await Kamar.findOne({
            include: {
                model: Dormitizen,
                as: 'penghuni_kamar',
                where: { user_id },
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
    const { user_id, user_role } = req.loginData;

    try {
        let me;
        let gedung_id;
        if (user_role == 'helpdesk') {
            me = await Helpdesk.findOne({
                where: { user_id },
            });
            gedung_id = me.gedung_id;
        } else {
            me = await Dormitizen.findOne({
                where: { user_id },
                attributes: ['nama'],
                include: {
                    model: Kamar,
                    as: 'kamar',
                    attributes: { include: ['gedung_id'] },
                },
            });
            gedung_id = me.kamar.gedung_id;
        }

        const response = await Kamar.findAll({
            attributes: ['nomor', 'status'],
            include: {
                attributes: ['nama'],
                model: Dormitizen,
                as: 'penghuni_kamar',
            },
            where: { gedung_id },
            order: [['nomor', 'ASC']],
        });

        let countTerbuka = 0;
        let countTertutup = 0;

        response.forEach((kamar) => {
            if (kamar.status === 'terbuka') {
                countTerbuka++;
            } else if (kamar.status === 'terkunci') {
                countTertutup++;
            }
        });
        return res.json({
            message: `Status kamar satu gedung berhasil diambil`,
            countTerbuka,
            countTertutup,
            data: response,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil status semua kamar',
            errMsg: error.message,
        });
    }
};

module.exports = {
    getUserKamarStatus,
    getAllKamarStatus,
};
