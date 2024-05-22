const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    products: {
      type: DataTypes.STRING,
      allowNull: null,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: null,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

module.exports = Product;
