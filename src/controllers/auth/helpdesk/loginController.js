const Helpdesk = require('../../../models/helpdesk.js');
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
        const helpdeskFound = await Helpdesk.findOne({
            where: { username },
        });
        if (!helpdeskFound) {
            return res
                .status(401)
                .json({ message: 'Username atau password salah' });
        }
        const verifikasi = await bcrypt.compare(
            password,
            helpdeskFound.password
        );
        if (!verifikasi) {
            return res
                .status(401)
                .json({ message: 'Username atau password salah' });
        }

        const accessToken = jwt.sign(
            { helpdesk_id: helpdeskFound.helpdesk_id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60m' }
        );
        const refreshToken = jwt.sign(
            { helpdesk_id: helpdeskFound.helpdesk_id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        await Helpdesk.update(
            { refresh_token: refreshToken },
            { where: { helpdesk_id: helpdeskFound.helpdesk_id } }
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
