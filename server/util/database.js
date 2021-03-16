const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('fixmystuff','root', '1234', {dialect : 'mysql',storage: './session.mysql'});

module.exports = sequelize;






