const admin = require('firebase-admin');
const serviceAccount = require('./src/configs/firebase-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

module.exports = admin;