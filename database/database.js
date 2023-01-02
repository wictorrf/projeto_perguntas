const Sequelize = require('sequelize');

const connection = new Sequelize('proj_perguntas', 'root', 'wictorrdossf20', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;