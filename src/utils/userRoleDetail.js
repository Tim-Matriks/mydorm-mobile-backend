const { Dormitizen, Helpdesk } = require('../models');

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

module.exports = userRoleDetails;
