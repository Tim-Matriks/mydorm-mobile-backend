const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.MYSQL_URL);

module.exports = db;
