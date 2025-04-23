const express = require('express');

/* IMPORTA O MODEL DE LIVRO */
const modelCategoria = require('../model/modelCategoria');

/* GERECIADOR DE ROTAS */
const router = express.Router();

/* ROTA DE INSERÇÃO DE CATEGORIA */
router.post('/inserirCAtegoria', (req, res)=>{

    let { nome_categoria} = req.body;

    modelCategoria.create(
        {
            nome_categoria,
        }
    )
    .then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'CATEGORIA INSERIDA COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO INSERIR A CATEGORIA',
                errorObject:error
            }
        );
    });

});

/* ROTA DE LISTAGEM GERAL DE CATEGORIAS */
router.get('/listagemCateorias', (req, res)=>{

    modelCategoria.findAll()
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'CATEGORIAS LISTADAS COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO LISTAR AS CATEGORIAS',
                errorObject:error
            }
        );
    });

    // return res.status(200).json({status:'TESTE DE LISTAGEM DE LIVROS!'});

});

/* ROTA DE LISTAGEM DE LIVRO POR CÓDIGO DE LIVRO*/
router.get('/listagemCategoria/:cod_categoria', (req, res)=>{

    let { cod_categoria } = req.params;

    modelCategoria.findByPk(cod_categoria)
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'CATEGORIA RECUPERADA COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO RECUPERAR A CATEGORIA',
                errorObject:error
            }
        );
    });

});

/* ROTA DE EXCLUSÃO DE CATEGORIA */
router.delete('/excluirCategoria/:cod_categoria', (req, res)=>{

    let { cod_categoria } = req.params;

    modelCategoria.destroy(
        {where:{cod_categoria}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'CATEGORIA EXCLUIDO COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO EXCLUIR A CATEGORIA',
                errorObject:error
            }
        );
    });

});

/* ROTA DE ALTERAÇÃO DE CATEORIA */
router.put('/alterarCategoria', (req, res)=>{

    let { cod_categoria, nome_categoria } = req.body;

    modelCategoria.update(
        {
            nome_categoria
        },
        {where:{cod_categoria}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'CATEGORIA ALTERADA COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO ALTERAR A CATEGORIA',
                errorObject:error
            }
        );
    });

});

module.exports = router;