const express = require('express');
const modelJogo = require('../model/modelJogo');
const router = express.Router();

// Rota de teste de conexão
router.get('/', (req, res) => {
  return res.status(200).json({ status: 'API de Jogos operacional!' });
});

// Inserir novo jogo
router.post('/inserirJogo', async (req, res) => {
  try {
    const {
      nome,
      desenvolvedor,
      plataforma,
      preco,
      imagem_url,
      descricao_jogo,
      ano_lancamento,
      usuario_id,
      cod_categoria
    } = req.body;

    if (
      !nome || !desenvolvedor || !plataforma || !preco ||
      !descricao_jogo || !ano_lancamento || !usuario_id || !cod_categoria
    ) {
      return res.status(400).json({
        errorStatus: true,
        mensageStatus: 'Campos obrigatórios faltando'
      });
    }

    const novoJogo = await modelJogo.create({
      nome,
      desenvolvedor,
      plataforma,
      preco,
      imagem_url,
      descricao_jogo,
      ano_lancamento,
      usuario_id,
      cod_categoria
    });

    res.status(201).json({
      errorStatus: false,
      mensageStatus: 'Jogo inserido com sucesso',
      data: novoJogo
    });

  } catch (error) {
    console.error('Erro ao inserir jogo:', error);
    res.status(500).json({
      errorStatus: true,
      mensageStatus: 'Erro interno no servidor',
      errorObject: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Listar todos os jogos
router.get('/listagemJogos', async (req, res) => {
  try {
    const jogos = await modelJogo.findAll();
    res.status(200).json({
      errorStatus: false,
      mensageStatus: 'Jogos listados com sucesso',
      data: jogos
    });
  } catch (error) {
    console.error('Erro ao listar jogos:', error);
    res.status(500).json({
      errorStatus: true,
      mensageStatus: 'Erro ao listar jogos',
      errorObject: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Obter jogo por ID
router.get('/listagemJogo/:id_game', async (req, res) => {
  try {
    const game = await modelJogo.findByPk(req.params.id_game);

    if (!game) {
      return res.status(404).json({
        errorStatus: true,
        mensageStatus: 'Jogo não encontrado'
      });
    }

    res.status(200).json({
      errorStatus: false,
      mensageStatus: 'Jogo recuperado com sucesso',
      data: game
    });

  } catch (error) {
    console.error('Erro ao buscar jogo:', error);
    res.status(500).json({
      errorStatus: true,
      mensageStatus: 'Erro ao buscar jogo',
      errorObject: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Excluir jogo
router.delete('/excluirJogo/:id_game', async (req, res) => {
  try {
    const resultado = await modelJogo.destroy({
      where: { id_jogo: req.params.id_game }
    });

    if (!resultado) {
      return res.status(404).json({
        errorStatus: true,
        mensageStatus: 'Jogo não encontrado'
      });
    }

    res.status(200).json({
      errorStatus: false,
      mensageStatus: 'Jogo excluído com sucesso'
    });

  } catch (error) {
    console.error('Erro ao excluir jogo:', error);
    res.status(500).json({
      errorStatus: true,
      mensageStatus: 'Erro ao excluir jogo',
      errorObject: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Atualizar jogo
router.put('/alterarJogo', async (req, res) => {
  try {
    const { id_game, ...camposAtualizar } = req.body;

    if (!id_game) {
      return res.status(400).json({
        errorStatus: true,
        mensageStatus: 'ID do jogo é obrigatório'
      });
    }

    const [linhasAfetadas] = await modelJogo.update(camposAtualizar, {
      where: { id_jogo: id_game }
    });

    if (linhasAfetadas === 0) {
      return res.status(404).json({
        errorStatus: true,
        mensageStatus: 'Jogo não encontrado'
      });
    }

    res.status(200).json({
      errorStatus: false,
      mensageStatus: 'Jogo atualizado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao atualizar jogo:', error);
    res.status(500).json({
      errorStatus: true,
      mensageStatus: 'Erro ao atualizar jogo',
      errorObject: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

module.exports = router;