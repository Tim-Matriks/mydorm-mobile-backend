require('dotenv').config();
const PORT = process.env.PORT | 4000;
const express = require('express');
const cors = require('cors');
const db = require('./src/configs/database.js');
const app = express();

app.use(cors());
app.use(express.json());

(async () => {
    await db.sync();
})();
app.use('/', require('./src/routes/authRoutes.js'));
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
