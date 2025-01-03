const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.MYSQL_URL, {
    define: {
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

module.exports = db;
