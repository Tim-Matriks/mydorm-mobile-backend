const ExcelJS = require('exceljs');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { User, Dormitizen, Helpdesk } = require('../../models');

exports.importUsers = async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);

        const worksheet = workbook.getWorksheet('user');
        const rows = [];

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return; // skip header
            const [
                username,
                password,
                role,
                nomor,
                nama,
                prodi,
                agama,
                no_hp,
                no_hp_ortu,
                alamat_ortu,
            ] = row.values.slice(1); // remove null at index 0

            rows.push({
                username,
                password,
                role,
                nomor,
                nama,
                prodi,
                agama,
                no_hp,
                no_hp_ortu,
                alamat_ortu,
            });
        });

        for (const row of rows) {
            const {
                username,
                password,
                role,
                nomor,
                nama,
                prodi,
                agama,
                no_hp,
                no_hp_ortu,
                alamat_ortu,
            } = row;

            if (!['helpdesk', 'senior_resident', 'dormitizen'].includes(role))
                continue;

            // check existing user (optional)
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) continue;

            const hashedPassword = await bcrypt.hash(password.toString(), 10);
            const newUser = await User.create({
                username,
                password: hashedPassword,
                role,
            });

            if (role === 'helpdesk') {
                await Helpdesk.create({
                    nip: nomor,
                    nama,
                    user_id: newUser.user_id,
                });
            } else {
                const is_senior = role === 'senior_resident';
                await Dormitizen.create({
                    nim: nomor,
                    nama,
                    prodi,
                    agama,
                    no_hp,
                    no_hp_ortu,
                    alamat_ortu,
                    is_senior,
                    user_id: newUser.user_id,
                });
            }
        }

        fs.unlinkSync(filePath); // hapus file setelah selesai
        res.status(200).json({ message: 'Import user berhasil' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal mengimpor data user' });
    }
};
