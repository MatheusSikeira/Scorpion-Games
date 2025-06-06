const express = require('express');

const modelUsuario = require('../model/modelUsuario');

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({ status: 'TESTE DE CONEXÃO COM A API!' });
});

router.post('/inserirUsuario', (req, res) => {
    let { nome_usuario, email_usuario, senha_usuario } = req.body;

    if (!nome_usuario || !email_usuario || !senha_usuario) {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'DADOS INVÁLIDOS: Todos os campos são obrigatórios.'
        });
    }

    modelUsuario.create({
        nome_usuario,
        email_usuario,
        senha_usuario
    })
        .then(() => {
            return res.status(201).json({
                errorStatus: false,
                mensageStatus: 'USUÁRIO INSERIDO COM SUCESSO'
            });
        })
        .catch((error) => {
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'HOUVE UM ERRO AO INSERIR O USUÁRIO',
                errorObject: error
            });
        });
});

router.get('/listagemUsuarios', (req, res) => {
    modelUsuario.findAll()
        .then((response) => {
            return res.status(201).json({
                errorStatus: false,
                mensageStatus: 'USUÁRIOS LISTADOS COM SUCESSO',
                data: response
            });
        })
        .catch((error) => {
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'HOUVE UM ERRO AO LISTAR OS USUÁRIOS',
                errorObject: error
            });
        });
});

router.get('/listagemUsuario/:id', (req, res) => {
    let { id } = req.params;

    modelUsuario.findByPk(id)
        .then((response) => {
            return res.status(201).json({
                errorStatus: false,
                mensageStatus: 'USUÁRIO RECUPERADO COM SUCESSO',
                data: response
            });
        })
        .catch((error) => {
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'HOUVE UM ERRO AO RECUPERAR O USUÁRIO',
                errorObject: error
            });
        });
});

router.delete('/excluirUsuario/:id', (req, res) => {
    let { id } = req.params;

    modelUsuario.destroy({ where: { id } })
        .then(() => {
            return res.status(201).json({
                errorStatus: false,
                mensageStatus: 'USUÁRIO EXCLUÍDO COM SUCESSO'
            });
        })
        .catch((error) => {
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'HOUVE UM ERRO AO EXCLUIR O USUÁRIO',
                errorObject: error
            });
        });
});

router.put('/alterarUsuario', (req, res) => {
    let { id, nome, email, senha } = req.body;

    modelUsuario.update(
        {
            nome,
            email,
            senha
        },
        { where: { id } }
    )
        .then(() => {
            return res.status(201).json({
                errorStatus: false,
                mensageStatus: 'USUÁRIO ALTERADO COM SUCESSO'
            });
        })
        .catch((error) => {
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'HOUVE UM ERRO AO ALTERAR O USUÁRIO',
                errorObject: error
            });
        });
});

module.exports = router;