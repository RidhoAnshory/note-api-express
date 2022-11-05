const Sequelize = require('sequelize');
require('dotenv').config();

const db = new Sequelize('notes_db', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  port: process.env.DB_PORT,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

module.exports = db;
