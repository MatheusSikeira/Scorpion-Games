// const { DataTypes } = require('sequelize');


// const connection = require('../database/database');


// const modelJogo = connection.define(
//     'jogos',
//     {
//         id_jogo: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         nome: {
//             type: DataTypes.STRING(255),
//             allowNull: false 
//         },
//         desenvolvedor: {
//             type: DataTypes.STRING(255),
//             allowNull: false 
//         },
//         plataforma: {
//             type: DataTypes.STRING(255),
//             allowNull: false 
//         },
//         preco: {
//             type: DataTypes.DECIMAL(10, 2),
//             allowNull: false
//         },
//         usuario_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//     }
// );

// // modelJogo.sync({force:true});

// module.exports = modelJogo;