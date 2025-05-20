require('dotenv').config();

const admin = require('firebase-admin');

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

firebaseConfig.private_key = firebaseConfig.private_key.replace(/\\n/g, '\n');

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});


module.exports = admin;