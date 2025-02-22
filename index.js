require('dotenv').config();
const PORT = process.env.PORT | 4000;
const express = require('express');
const cors = require('cors');
const db = require('./src/configs/database.js');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./src/middleware/verifyJWT.js');
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Untuk mengatur relasi antar tabel
require('./src/models/Association.js');

(async () => {
    await db.sync();
})();
app.use('/', require('./src/routes/AuthRoutes.js'));
app.use('/user', verifyJWT, require('./src/routes/DormitizenRoutes.js'));
app.use('/laporan', verifyJWT, require('./src/routes/LaporanRoutes.js'));
app.use('/berita', verifyJWT, require('./src/routes/BeritaRoutes.js'));
app.use(
    '/pelanggaran',
    verifyJWT,
    require('./src/routes/PelanggaranRoutes.js')
);
app.use(
    '/logKeluarMasuk',
    verifyJWT,
    require('./src/routes/LogKeluarMasukRoutes.js')
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
