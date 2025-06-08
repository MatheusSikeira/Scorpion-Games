const Sequelize = require('sequelize');

/***** CRIA A CONEXÃO COMO BANCO DE DADOS *****/
/*
PARAMETROS DO SEQUELIZE
1 - NOME DO BANCO - STRING
2 - USUÁRIO DO BANCO - STRING
3 - SENHA DO BANCO - STRING
4 - JSON:
    4.1 - O LOCAL ONDE O BANCO ESTÁ EXECUTANTO (host)
    4.2 - PORTA LÓGICA ONDE O BANCO ESTA SENDO EXECUTADO
    4.3 - TIPO DO BANCO (dialect)
    4.4 - DEFINE O FUSO HORARIO LOCAL
*/
const connection = new Sequelize(
    'scorpion_games',
    'root',
    'etecembu@123',
    {
        host: 'localhost',
        port: '3306',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection;