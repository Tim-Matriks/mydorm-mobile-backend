const Dormitizen = require('../../../models/dormitizen.js');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res
            .status(200)
            .json({ message: 'No refresh token present, already logged out' });
    }

    const refreshToken = cookies.jwt;

    const dormitizenFound = await Dormitizen.findOne({
        where: { refresh_token: refreshToken },
    });
    if (!dormitizenFound) {
        res.clearCookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res
            .status(200)
            .json({ message: 'User not found, token cleared' });
    }

    await dormitizenFound.update(
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
