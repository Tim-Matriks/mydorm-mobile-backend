const { Kamar, Helpdesk, Dormitizen, Gedung } = require('../models');

const getLoggedInUser = async (req, res) => {
    const { user_id, user_role } = req.loginData;

    try {
        let userDetail;
        if (user_role == 'helpdesk') {
            userDetail = await Helpdesk.findOne({
                where: { user_id },
                include: { model: Gedung },
            });
        } else {
            userDetail = await Dormitizen.findOne({
                where: { user_id },
                include: {
                    model: Kamar,
                    as: 'kamar',
                    include: { model: Gedung, as: 'gedung' },
                },
            });
        }

        res.json({
            message: `Data user login berhasil diambil`,
            data: userDetail,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat mengubah data pelanggaran',
            errMsg: error.message,
        });
    }
};

module.exports = {
    getLoggedInUser,
};
