const { User } = require('../../models');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    if (
        role !== 'dormitizen' &&
        role !== 'senior_resident' &&
        role !== 'helpdesk'
    ) {
        return res.status(400).json({ message: 'Role tidak valid' });
    }

    const duplicate = await User.findOne({
        where: { username },
    });
    if (duplicate)
        return res.status(409).json({ message: 'Username sudah terdaftar' });

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = {
            username,
            password: hashedPwd,
            role,
            gambar: 'blank-profile-pic.png',
            refresh_token: null,
        };
        await User.create(newUser);
        return res.status(201).json({ message: 'User baru berhasil dibuat' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan ketika menambah user',
            errMsg: error.message,
        });
    }
};

module.exports = handleRegister;
