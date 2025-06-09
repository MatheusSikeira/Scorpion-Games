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
        },
        tipo_usuario: {
            type: Sequelize.ENUM('cliente', 'vendedor'),
            allowNull: false,
            defaultValue: 'cliente'
        },
        nome_loja: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        link_loja: {
            type: Sequelize.STRING(255),
            allowNull: true
        }
    }
);

// Sincroniza o modelo com o banco de dados (usado apenas para criar a tabela automaticamente)
// modelUsuario.sync({ force: true });

module.exports = modelUsuario;