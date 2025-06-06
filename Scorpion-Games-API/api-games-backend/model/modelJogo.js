const Sequelize = require('sequelize');
const connection = require('../database/database');

const modelJogo = connection.define(
  'tbl_jogos',
  {
    id_jogo: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    desenvolvedor: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    plataforma: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    preco: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    imagem_url: {
      type: Sequelize.STRING(500),
      allowNull: true
    },

    descricao_jogo: {
      type: Sequelize.TEXT,
      allowNull: false          
    },
    ano_lancamento: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1980,
        max: 2030
      }
    },
    usuario_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    cod_categoria: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }
);

// modelJogo.sync({ alter: true });

module.exports = modelJogo;
