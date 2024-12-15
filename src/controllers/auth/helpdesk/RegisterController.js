const Helpdesk = require('../../../models/helpdesk.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    const { username, password, nip, nama } = req.body;
    if (!username || !password || !nip || !nama) {
        return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    const duplicate = await Helpdesk.findOne({
        where: { [Op.or]: [{ username }] },
    });
    if (duplicate)
        return res.status(409).json({ message: 'Username sudah terdaftar' });

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const newHelpdesk = {
            username,
            password: hashedPwd,
            nip,
            nama,
        };
        await Helpdesk.create(newHelpdesk);
        res.status(201).json({ message: 'User Helpdesk berhasil dibuat' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = handleRegister;
