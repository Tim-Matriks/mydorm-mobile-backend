const ExcelJS = require('exceljs');
const {
    LogKeluarMasuk,
    Dormitizen,
    Helpdesk,
    Kamar,
    User,
} = require('../models');
const { getUserGedungId } = require('../utils/userRoleDetail');

const exportLogKeluarMasuk = async (req, res) => {
    const { user_id, user_role } = req.loginData;

    if (user_role != 'helpdesk')
        return res
            .status(403)
            .json({ message: 'Anda tidak boleh mengakses halaman ini' });

    try {
        const gedung_id = await getUserGedungId(user_id, user_role);

        const response = await LogKeluarMasuk.findAll({
            where: { '$dormitizen.kamar.gedung_id$': gedung_id },
            include: [
                {
                    model: Dormitizen,
                    as: 'dormitizen',
                    include: {
                        model: Kamar,
                        as: 'kamar',
                    },
                },
                {
                    model: User,
                    as: 'pencatat',
                    attributes: ['role'],
                    include: [{ model: Helpdesk }, { model: Dormitizen }],
                },
            ],
            order: [['created_at', 'DESC']],
        });

        const cleanedLogs = response.map((log) => {
            const pencatat = log.pencatat;

            let pencatatData = null;
            if (pencatat?.helpdesk) {
                pencatatData = {
                    role: 'helpdesk',
                    ...pencatat.helpdesk.toJSON(),
                };
            } else if (pencatat?.dormitizen) {
                pencatatData = {
                    role: 'senior_resident',
                    ...pencatat.dormitizen.toJSON(),
                };
            }

            return {
                ...log.toJSON(),
                pencatat: pencatatData,
            };
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Log Keluar Masuk');

        // Header
        worksheet.columns = [
            { header: 'No', key: 'no', width: 5 },
            { header: 'Tanggal', key: 'tanggal', width: 20 },
            { header: 'Nomor kamar', key: 'kamar', width: 25 },
            { header: 'Nama Dormitizen', key: 'dormitizen', width: 25 },
            { header: 'Nama Pencatat', key: 'pencatat', width: 25 },
            { header: 'Aktivitas', key: 'aktivitas', width: 10 },
            { header: 'Status', key: 'status', width: 10 },
        ];

        // Isi
        cleanedLogs.forEach((item, index) => {
            if (item.pencatat != null) {
                let namaPencatat = item.pencatat.nama;
            }
            worksheet.addRow({
                no: index + 1,
                tanggal: item.created_at,
                kamar: item.dormitizen.kamar.nomor,
                dormitizen: item.dormitizen.nama,
                pencatat: item.pencatat?.nama || '-',
                aktivitas: item.aktivitas,
                status: item.status,
            });
        });

        // Output
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=laporan-log-keluar-masuk.xlsx'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat membuat laporan log keluar masuk',
            errMsg: error.message,
        });
    }
};

module.exports = { exportLogKeluarMasuk, exportPaket };
