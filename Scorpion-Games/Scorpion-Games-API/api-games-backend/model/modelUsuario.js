const Sequelize = require('sequelize');

const connection = require('../database/database');

const modelUsuario = connection.define(
    'usuarios',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome_usuario: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        email_usuario: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true
        },
        senha_usuario: {
            type: Sequelize.STRING(255),
            allowNull: false
        }
    }
);

// const modelJogo = require('./modelJogo'); // Importa o modelo de jogos

// Um usuário pode ter vários jogos (relação 1:N)
// modelUsuario.hasMany(modelJogo, {
//     foreignKey: 'usuario_id' // Chave estrangeira na tabela `jogos`
// });

// Um jogo pertence a um usuário (relação N:1)
// modelJogo.belongsTo(modelUsuario, {
//     foreignKey: 'usuario_id' // Chave estrangeira na tabela `jogos`
// });

// Sincroniza o modelo com o banco de dados (usado apenas para criar a tabela automaticamente)
// modelUsuario.sync({ force: true });

module.exports = modelUsuario;