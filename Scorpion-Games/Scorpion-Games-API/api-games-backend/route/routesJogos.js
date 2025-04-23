// const express = require('express');

// const modelJogo = require('../model/modelJogo');

// const router = express.Router();

// router.get('/', (req, res) => {
//     return res.status(200).json({ status: 'TESTE DE CONEXÃO COM A API!' });
// });

// router.post('/inserirJogo', (req, res) => {
//     let { nome, desenvolvedor, plataforma, preco, usuario_id } = req.body;

//     modelJogo.create({
//         nome,
//         desenvolvedor,
//         plataforma,
//         preco,
//         usuario_id
//     })
//         .then(() => {
//             return res.status(201).json({
//                 errorStatus: false,
//                 mensageStatus: 'JOGO INSERIDO COM SUCESSO'
//             });
//         })
//         .catch((error) => {
//             return res.status(400).json({
//                 errorStatus: true,
//                 mensageStatus: 'HOUVE UM ERRO AO INSERIR O JOGO',
//                 errorObject: error
//             });
//         });
// });

// router.get('/listagemJogos', (req, res) => {
//     modelJogo.findAll()
//         .then((response) => {
//             return res.status(201).json({
//                 errorStatus: false,
//                 mensageStatus: 'JOGOS LISTADOS COM SUCESSO',
//                 data: response
//             });
//         })
//         .catch((error) => {
//             return res.status(400).json({
//                 errorStatus: true,
//                 mensageStatus: 'HOUVE UM ERRO AO LISTAR OS JOGOS',
//                 errorObject: error
//             });
//         });
// });

// router.get('/listagemJogo/:id_jogo', (req, res) => {
//     let { id_jogo } = req.params;

//     modelJogo.findByPk(id_jogo)
//         .then((response) => {
//             return res.status(201).json({
//                 errorStatus: false,
//                 mensageStatus: 'JOGO RECUPERADO COM SUCESSO',
//                 data: response
//             });
//         })
//         .catch((error) => {
//             return res.status(400).json({
//                 errorStatus: true,
//                 mensageStatus: 'HOUVE UM ERRO AO RECUPERAR O JOGO',
//                 errorObject: error
//             });
//         });
// });

// router.delete('/excluirJogo/:id_jogo', (req, res) => {
//     let { id_jogo } = req.params;

//     modelJogo.destroy({ where: { id_jogo } })
//         .then(() => {
//             return res.status(201).json({
//                 errorStatus: false,
//                 mensageStatus: 'JOGO EXCLUÍDO COM SUCESSO'
//             });
//         })
//         .catch((error) => {
//             return res.status(400).json({
//                 errorStatus: true,
//                 mensageStatus: 'HOUVE UM ERRO AO EXCLUIR O JOGO',
//                 errorObject: error
//             });
//         });
// });

// /* ROTA DE ALTERAÇÃO DE JOGO */
// router.put('/alterarJogo', (req, res) => {
//     let { id_jogo, nome, desenvolvedor, plataforma, preco } = req.body;

//     modelJogo.update(
//         {
//             nome,
//             desenvolvedor,
//             plataforma,
//             preco
//         },
//         { where: { id_jogo } }
//     )
//         .then(() => {
//             return res.status(201).json({
//                 errorStatus: false,
//                 mensageStatus: 'JOGO ALTERADO COM SUCESSO'
//             });
//         })
//         .catch((error) => {
//             return res.status(400).json({
//                 errorStatus: true,
//                 mensageStatus: 'HOUVE UM ERRO AO ALTERAR O JOGO',
//                 errorObject: error
//             });
//         });
// });

// module.exports = router;