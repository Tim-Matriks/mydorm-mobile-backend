const { Kamar, Gedung, Dormitizen } = require('../../models');

exports.assignKamar = async (req, res) => {
    try {
        // Ambil semua kamar pada semua gedung, urutkan
        // berdasarkan kode gedung dan nomor kamar
        const semuaKamar = await Kamar.findAll({
            attributes: ['kamar_id', 'nomor'],
            include: { model: Gedung, as: 'gedung', attributes: ['kode'] },
            order: [
                [{ model: Gedung, as: 'gedung' }, 'kode', 'ASC'],
                ['nomor', 'asc'],
            ],
        });

        // Assign dormitizen ke kamar-kamarnya secara berurutan.
        // Dormitizen tersebut dibagi ke 2 kelompok, lalu di input
        // ke gedung A01 dan A02 agar ada data dormitizen beda gedung
        //
        // Note:
        // ini cuma berlaku selama total dormitizen data dummy masih < 188.
        // Kalau udah >188, banyaknya dormitizen dah lebih dari 2 gedung,
        // jadi gausah dibagi 2 gini lagi
        const semuaDormitizen = await Dormitizen.findAll({
            attributes: ['dormitizen_id', 'nim'],
            order: [['nim', 'ASC']],
        });

        let mid = Math.floor(semuaDormitizen.length / 2);
        let firstHalf = semuaDormitizen.slice(0, mid);
        let secondHalf = semuaDormitizen.slice(mid);

        let kamarDigunakan = Math.ceil(firstHalf.length / 4);
        for (let i = 0; i < kamarDigunakan; i++) {
            for (let j = i * 4; j < i * 4 + 4; j++) {
                if (firstHalf[j] === undefined) break;
                await firstHalf[j].update({
                    kamar_id: semuaKamar[i].kamar_id,
                });
            }
        }
        kamarDigunakan = Math.ceil(secondHalf.length / 4);
        for (let i = 0 + 94; i < kamarDigunakan + 94; i++) {
            for (let j = (i - 94) * 4; j < (i - 94) * 4 + 4; j++) {
                if (secondHalf[j] === undefined) break;
                await secondHalf[j].update({
                    kamar_id: semuaKamar[i].kamar_id,
                });
            }
        }

        // Ini buat dapetin semua dormitizen, beserta nomor kamarnya,
        // beserta kode gedungnya. Diurutkan berdasarkan nomor kamar
        // dan kode gedungnya
        const semuaDormitizenDenganKamar = await Dormitizen.findAll({
            attributes: ['nama', 'nim'],
            include: {
                model: Kamar,
                as: 'kamar',
                attributes: ['nomor'],
                include: { model: Gedung, as: 'gedung', attributes: ['kode'] },
                order: [
                    [{ model: Gedung, as: 'gedung' }, 'kode', 'ASC'],
                    ['nomor', 'asc'],
                ],
            },
            order: [['nim', 'ASC']],
        });

        res.status(200).json({
            message: 'Assign kamar user berhasil',
            //data_gedung: semuaKamar,
            //data_dormitizen: semuaDormitizen,
            //data: semuaDormitizenDenganKamar,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal assign kamar untuk user' });
    }
};
