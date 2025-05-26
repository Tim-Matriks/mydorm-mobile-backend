const Dormitizen = require('../models/Dormitizen.js');
const Helpdesk = require('../models/Helpdesk.js')
const admin = require('../../firebase.js')

const saveTokenDormitizen = async (req, res) => {
    const { fcm_token } = req.body;
    const dormitizen_id = req.user_id;

    if (!dormitizen_id || !fcm_token) {
      return res.status(400).json({ message: 'dormitizen_id dan token wajib diisi' });
    }
  
    try {

        await Dormitizen.update(
            { fcm_token: fcm_token },
            { where: { dormitizen_id: dormitizen_id } }
        );
   
      res.status(200).json({
        message: 'Token berhasil disimpan',
        data: {
          dormitizen_id,
          fcm_token,
        },
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Gagal menyimpan token' });
    }
  };

  const deleteTokenDormitizen = async (req, res) => {
    const dormitizen_id = req.user_id;

    if (!dormitizen_id) {
      return res.status(400).json({ message: 'dormitizen_id wajib disertakan di URL' });
    }
  
    try {
      const [updated] = await Dormitizen.update(
        {
          fcm_token: null,
        },
        {
          where: { dormitizen_id }
        }
      );
  
      if (updated === 0) {
        return res.status(404).json({ message: `Dormitizen dengan ID ${dormitizen_id} tidak ditemukan` });
      }
  
      res.status(200).json({ message: 'FCM token berhasil dihapus' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat menghapus token' });
    }
  };

  const saveTokenHelpdesk = async (req, res) => {
    const { fcm_token } = req.body;
    const helpdesk_id = req.user_id;

    if (!helpdesk_id|| !fcm_token) {
      return res.status(400).json({ message: 'dormitizen_id dan token wajib diisi' });
    }
  
    try {

        await Helpdesk.update(
            { fcm_token: fcm_token },
            { where: { helpdesk_id: helpdesk_id } }
        );
   
      res.status(200).json({
        message: 'Token berhasil disimpan',
        data: {
          helpdesk_id,
          fcm_token,
        },
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Gagal menyimpan token' });
    }
  };

  const deleteTokenHelpdesk = async (req, res) => {
    const helpdesk_id = req.user_id;

    if (!helpdesk_id) {
      return res.status(400).json({ message: 'helpdesk_id wajib disertakan di URL' });
    }
  
    try {
      const [updated] = await Helpdesk.update(
        {
          fcm_token: null,
        },
        {
          where: { helpdesk_id }
        }
      );
  
      if (updated === 0) {
        return res.status(404).json({ message: `Helpdesk dengan ID ${helpdesk_id} tidak ditemukan` });
      }
  
      res.status(200).json({ message: 'FCM token berhasil dihapus' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat menghapus token' });
    }
  };

  const sendNotification = async ({ fcm_token, title, body }) => {
    if (!title ) {
      throw new Error('title harus diisi');
    }
    if (!body) {
      throw new Error('body harus diisi');
    }
  if (!fcm_token ) {
    throw new Error('Semua field wajib diisi');
  }

  const message = {
    token: fcm_token,
    notification: {
      title,
      body,
    },
  };

  // Kirim notifikasi
  return await admin.messaging().send(message);
};

module.exports = {
    saveTokenDormitizen,
    deleteTokenDormitizen,
    sendNotification,
    saveTokenHelpdesk,
    deleteTokenHelpdesk
};