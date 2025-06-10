const { User } = require('../../models/index.js');
const bcrypt = require('bcrypt');
const ms = require('ms');
const {
    generateAccessToken,
    generateRefreshToken,
} = require('../../utils/tokenGenerator.js');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: 'Username dan password wajib ada' });
    }

    try {
        const userFound = await User.findOne({
            where: { username },
            attributes: ['user_id', 'username', 'password', 'role'],
        });
        if (!userFound) {
            return res
                .status(401)
                .json({ message: 'Username atau password salah' });
        }
        const isPasswordMatch = await bcrypt.compare(
            password,
            userFound.password
        );
        if (!isPasswordMatch) {
            return res
                .status(401)
                .json({ message: 'Username atau password salah' });
        }

        const accessToken = generateAccessToken({
            user_id: userFound.user_id,
            role: userFound.role,
        });
        const refreshToken = generateRefreshToken({
            user_id: userFound.user_id,
            role: userFound.role,
        });

        await User.update(
            { refresh_token: refreshToken },
            { where: { user_id: userFound.user_id } }
        );

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: ms(process.env.REFRESH_TOKEN_EXP || '1d'),
            sameSite: 'Lax',
            secure: false,
        });
        return res.status(200).json({
            message: 'Login berhasil',
            role: userFound.role,
            accessToken,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat login pada server',
            errMsg: error.message,
        });
    }
};

module.exports = handleLogin;
