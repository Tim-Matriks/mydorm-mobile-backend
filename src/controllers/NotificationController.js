const Dormitizen = require('../models/Dormitizen.js');
const admin = require('../../firebase.js')

const saveToken = async (req, res) => {
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

  const deleteToken = async (req, res) => {
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

  const sendNotificationTes = async (req, res) => {
    const {dormitizen_id, title, body} = req.body;

    try {

    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Gagal mengirim notifikasi'});
    }
  }

module.exports = {
    saveToken,
    deleteToken
};