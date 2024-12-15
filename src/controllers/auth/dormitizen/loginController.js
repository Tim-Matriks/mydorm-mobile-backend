const Dormitizen = require('../../../models/dormitizen.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: 'Username dan password wajib ada' });
    }

    try {
        const dormitizenFound = await Dormitizen.findOne({
            where: { username },
        });
        if (!dormitizenFound) {
            return res
                .status(401)
                .json({ message: 'Username atau password salah' });
        }
        const verifikasi = await bcrypt.compare(
            password,
            dormitizenFound.password
        );
        if (!verifikasi) {
            return res
                .status(401)
                .json({ message: 'Username atau password salah' });
        }

        const accessToken = jwt.sign(
            { user_id: dormitizenFound.dormitizen_id, type: 'dormitizen' },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60m' }
        );
        const refreshToken = jwt.sign(
            { user_id: dormitizenFound.dormitizen_id, type: 'dormitizen' },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        await Dormitizen.update(
            { refresh_token: refreshToken },
            { where: { dormitizen_id: dormitizenFound.dormitizen_id } }
        );

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({
            message: 'Login berhasil',
            accessToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = handleLogin;
