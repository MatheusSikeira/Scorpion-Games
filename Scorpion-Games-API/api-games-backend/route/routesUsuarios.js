const express = require('express');

const modelUsuario = require('../model/modelUsuario');

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({ status: 'TESTE DE CONEXÃO COM A API!' });
});

// Rota para criar usuário cliente ou vendedor
router.post('/usuarios', (req, res) => {
    const { nome_usuario, email_usuario, senha_usuario, tipo_usuario, nome_loja, link_loja } = req.body;

    if (!nome_usuario || !email_usuario || !senha_usuario || !tipo_usuario) {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'DADOS INVÁLIDOS: nome, email, senha e tipo_usuario são obrigatórios.'
        });
    }

    // Se for vendedor, nome_loja e link_loja são obrigatórios
    if (tipo_usuario === 'vendedor' && (!nome_loja || !link_loja)) {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'DADOS INVÁLIDOS: nome_loja e link_loja são obrigatórios para vendedor.'
        });
    }

    modelUsuario.create({
        nome_usuario,
        email_usuario,
        senha_usuario,
        tipo_usuario,
        nome_loja: tipo_usuario === 'vendedor' ? nome_loja : null,
        link_loja: tipo_usuario === 'vendedor' ? link_loja : null
    })
        .then((usuario) => {
            return res.status(201).json({
                errorStatus: false,
                mensageStatus: 'USUÁRIO INSERIDO COM SUCESSO',
                data: usuario
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