const Sequelize = require('sequelize');
const connection = require('../database/database');
const modelJogo = require('./modelJogo');

const modelImagem = connection.define(
  'tbl_imagens',
  {
    id_imagem: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome_arquivo: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    url: {
      type: Sequelize.STRING(500),
      allowNull: false
    },
    jogo_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_jogos',
        key: 'id_jogo'
      }
    },
    tipo: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    tamanho: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }
);

// Relacionamento com modelJogo
modelImagem.belongsTo(modelJogo, { foreignKey: 'jogo_id' });
modelJogo.hasMany(modelImagem, { foreignKey: 'jogo_id' });

// modelImagem.sync({ force: true });

module.exports = modelImagem;