const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("tugaseduworkproducts", "root", "Biput777", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
