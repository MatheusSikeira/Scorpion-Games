const Sequelize = require('sequelize');

const connection = require('../database/database');

/*
PARAMETROS DO MÉTODO DEFINE
1 - NOME DA TABELA - STRING
2 - OBJETO JSON: 
                NOME DO CAMPO DA TABELA
                TIPO DE DADO DO CAMPO DA TABELA
                REGRAS DO CAMPO DA TABELA (NULL, NOT NULL, DEFAULT...ETC)
*/
const modelCategoria = connection.define(
    'tbl_categoria',
    {
        cod_categoria:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nome_categoria:{
            type:Sequelize.STRING(100),
            allowNull:true
        }
    }
);

modelCategoria.sync({force:true}); 

module.exports = modelCategoria;