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

(async () => {
    await db.sync();
})();
app.use('/dormitizen', require('./src/routes/dormitizenRoutes.js'));
app.use('/laporan', verifyJWT, require('./src/routes/laporanRoutes.js'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
