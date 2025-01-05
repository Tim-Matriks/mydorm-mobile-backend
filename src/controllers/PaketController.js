const Dormitizen = require('../models/Dormitizen.js');
const Helpdesk = require('../models/Helpdesk.js');
const Kamar = require('../models/Kamar.js');
const Paket = require('../models/Paket.js');

const getAllPaket = async (req, res) => {
    try {
        const response = await Paket.findAll({
            attributes: {
                exclude: [
                    'penerima_paket',
                    'penyerahan_paket',
                    'dormitizen_id',
                    'created_at',
                    'updated_at',
                ],
            },
            include: [
                {
                    model: Dormitizen,
                    attributes: {
                        exclude: [
                            'password',
                            'refresh_token',
                            'kamar_id',
                            'created_at',
                            'updated_at',
                        ],
                    },
                    include: {
                        model: Kamar,
                        attributes: {
                            exclude: ['created_at', 'updated_at', 'gedung_id'],
                        },
                    },
                },
                {
                    model: Helpdesk,
                    as: 'penerima paket',
                    attributes: {
                        exclude: [
                            'password',
                            'refresh_token',
                            'created_at',
                            'updated_at',
                        ],
                    },
                },
                {
                    model: Helpdesk,
                    as: 'penyerahan paket',
                    attributes: {
                        exclude: [
                            'password',
                            'refresh_token',
                            'created_at',
                            'updated_at',
                        ],
                    },
                },
            ],
        });
        res.json({
            message: `Data semua paket berhasil diambil`,
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const getUserPaket = async (req, res) => {
    const user_id = req.user_id;

    try {
        const response = await Paket.findAll({
            attributes: {
                exclude: [
                    'penerima_paket',
                    'penyerahan_paket',
                    'dormitizen_id',
                    'created_at',
                    'updated_at',
                ],
            },
            where: { dormitizen_id: user_id },
            include: [
                {
                    model: Dormitizen,
                    attributes: {
                        exclude: [
                            'password',
                            'refresh_token',
                            'kamar_id',
                            'created_at',
                            'updated_at',
                        ],
                    },
                    include: {
                        model: Kamar,
                        attributes: {
                            exclude: ['created_at', 'updated_at', 'gedung_id'],
                        },
                    },
                },
                {
                    model: Helpdesk,
                    as: 'penerima paket',
                    attributes: {
                        exclude: [
                            'password',
                            'refresh_token',
                            'created_at',
                            'updated_at',
                        ],
                    },
                },
                {
                    model: Helpdesk,
                    as: 'penyerahan paket',
                    attributes: {
                        exclude: [
                            'password',
                            'refresh_token',
                            'created_at',
                            'updated_at',
                        ],
                    },
                },
            ],
        });
        res.json({
            message: `Data semua paket user berhasil diambil`,
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getAllPaket,
    getUserPaket,
};
