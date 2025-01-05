const Helpdesk = require('../../../models/Helpdesk.js');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res
            .status(200)
            .json({ message: 'No refresh token present, already logged out' });
    }

    const refreshToken = cookies.jwt;

    const helpdeskFound = await Helpdesk.findOne({
        where: { refresh_token: refreshToken },
    });
    if (!helpdeskFound) {
        res.clearCookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res
            .status(200)
            .json({ message: 'User not found, token cleared' });
    }

    await helpdeskFound.update(
        { refresh_token: null },
        { where: { refresh_token: refreshToken } }
    );
    res.clearCookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: 'Logout successful' });
};

module.exports = handleLogout;
