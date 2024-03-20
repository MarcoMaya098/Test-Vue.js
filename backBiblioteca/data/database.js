const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('biblioteca','root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;