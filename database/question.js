const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");
const connection = require("./database");

const Questions = connection.define('question', {
    title:{
        type: Sequelize.STRING,
        allowNULL: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNULL: false
    }
});

Questions.sync({force: false}).then(() => {});

module.exports = Questions;