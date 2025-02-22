const Dormitizen = require('../../../models/Dormitizen.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    const {
        nim,
        nama,
        username,
        password,
        prodi,
        agama,
        no_hp,
        no_hp_ortu,
        alamat_ortu,
        gambar,
        kamar_id,
    } = req.body;
    if (!username || !password || !nim || !nama) {
        return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    const duplicate = await Dormitizen.findOne({
        where: { [Op.or]: [{ username }] },
    });
    if (duplicate)
        return res.status(409).json({ message: 'Username sudah terdaftar' });

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const newDormitizen = {
            username,
            password: hashedPwd,
            nim,
            nama,
            prodi,
            agama,
            no_hp,
            no_hp_ortu,
            alamat_ortu,
            gambar,
            kamar_id,
        };
        await Dormitizen.create(newDormitizen);
        res.status(201).json({ message: 'User Dormitizen berhasil dibuat' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = handleRegister;
