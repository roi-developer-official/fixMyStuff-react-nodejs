const {Sequelize} = require('sequelize');
const config = require('config');
console.log(config.get("db"));

const sequelize = new Sequelize(config.get("db"),config.get("userName"), config.get("password"), {dialect : 'mysql'});

(async function connect(){
  try {
      await sequelize.authenticate();

    } catch (error) {
      console.log(error);
    }
  })();

  module.exports = sequelize;
  
