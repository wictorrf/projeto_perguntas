const Sequelize = require('sequelize');

const connection = new Sequelize('questions', 'root', 'wictorrdossf20', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;