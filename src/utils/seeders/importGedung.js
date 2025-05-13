const ExcelJS = require('exceljs');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { Gedung, Kamar } = require('../../models');

exports.importGedung = async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);

        const worksheet = workbook.getWorksheet('gedung');
        const rows = [];

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return; // skip header
            const [kode, nama] = row.values.slice(1); // remove null at index 0

            rows.push({
                kode,
                nama,
            });
        });

        const semuaGedung = await Gedung.bulkCreate(rows);
        await generateKamar(semuaGedung);

        fs.unlinkSync(filePath); // hapus file setelah selesai
        res.status(200).json({
            message:
                'Import gedung berhasil. Generate kamar tiap gedung berhasil',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal mengimpor data gedung' });
    }
};

const generateKamar = async (semuaGedung) => {
    const semuaKamar = [];

    const ranges = [
        [101, 122],
        [201, 224],
        [301, 324],
        [401, 424],
    ];

    semuaGedung.forEach((gedung) => {
        ranges.forEach(([start, end]) => {
            for (let i = start; i <= end; i++) {
                semuaKamar.push({
                    nomor: i.toString(),
                    gedung_id: gedung.gedung_id,
                });
            }
        });
    });

    await Kamar.bulkCreate(semuaKamar);
};
