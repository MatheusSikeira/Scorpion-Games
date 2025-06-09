const Sequelize = require('sequelize');
const connection = require('../database/database');

const modelPlataforma = connection.define(
  'plataformas',
  {
    id_plataforma: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome_plataforma: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true
    }
  }
);

// modelPlataforma.sync({ alter: true });

module.exports = modelPlataforma;