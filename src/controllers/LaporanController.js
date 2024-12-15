const { Op } = require('sequelize');
const Laporan = require('../models/laporan.js');

const getAllLaporanByUser = async (req, res) => {
    try {
        const response = await Laporan.findAll({
            where: {
                [Op.or]: [
                    { dormitizen_id: req.user_id },
                    { helpdesk_id: req.user_id },
                ],
            },
        });
        res.json({
            message: 'Data laporan berhasil diambil',
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const createLaporan = async (req, res) => {
    try {
        const laporan = await Laporan.build(req.body);
        if (req.user_type == 'dormitizen') {
            laporan.dormitizen_id = req.user_id;
        } else if (req.user_type == 'helpdesk') {
            laporan.helpdesk_id = req.user_id;
        }
        await laporan.save();

        res.status(201).json({ message: 'Laporan berhasil dibuat' });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const updateProduct = async (req, res) => {
    try {
        const {
            price,
            quantity: oldStock,
            sold: oldSold,
        } = await Product.findOne({
            where: { product_id: req.params.product_id },
            attributes: ['price', 'quantity', 'sold'],
        });

        // Membuat report
        const { stock, sold } = req.body;
        if (stock == oldStock && sold == oldSold) {
            return res.json({ message: 'Tidak ada perubahan stock atau sold' });
        } else {
            const report = Report.build();
            if (stock > oldStock) {
                report.stock_in = stock - oldStock;
            } else {
                report.stock_in = 0;
            }
            if (sold > oldSold) {
                report.stock_out = sold - oldSold;
                report.revenue = price * report.stock_out;
            } else {
                report.stock_out = 0;
                report.revenue = 0;
            }

            const obj = new Date();
            report.day = obj.getDate();
            report.month = obj.getMonth() + 1;
            report.year = obj.getFullYear();

            report.product_id = req.params.product_id;
            await report.save();
        }

        // Ubah stock dan sold di product
        await Product.update(
            {
                quantity: stock,
                sold,
            },
            {
                where: {
                    product_id: req.params.product_id,
                },
            }
        );
        res.json({ message: 'Data produk berhasil diubah. Laporan ditambah' });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getAllLaporanByUser,
    createLaporan,
};
