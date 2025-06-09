const { Dormitizen, Helpdesk, Kamar } = require('../models');

const userRoleDetails = async (user_id, user_role) => {
    let result;
    if (user_role == 'dormitizen' || user_role == 'senior_resident') {
        result = await Dormitizen.findOne({ where: { user_id } });
    }
    if (user_role == 'helpdesk') {
        result = await Helpdesk.findOne({ where: { user_id } });
    }
    return result;
};

const getUserGedungId = async (user_id, user_role) => {
    let result;
    if (user_role == 'helpdesk') {
        result = await Helpdesk.findOne({ where: { user_id } });
        return result.gedung_id;
    }

    result = await Dormitizen.findOne({
        where: { user_id },
        include: { model: Kamar, as: 'kamar' },
    });
    return result.kamar.gedung_id;
};

module.exports = { userRoleDetails, getUserGedungId };
