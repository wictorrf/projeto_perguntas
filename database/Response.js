const sequelize = require("sequelize");
const connection = require("./database");

const Response = connection.define("response", {
    body: {
        type: sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

Response.sync({force: false});
module.exports = Response; 