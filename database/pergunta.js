const Sequelize = require("sequelize"); // Aqui é o model, onde ira criar as tabelas do db;
const connection = require("./database");

const Questions = connection.define('question', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Pergunta.sync({force: false}).then(() => {});

module.exports = Questions;