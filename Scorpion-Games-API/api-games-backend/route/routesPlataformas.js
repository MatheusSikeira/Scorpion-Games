const express = require('express');
const router = express.Router();
const modelPlataforma = require('../model/modelPlataforma');

// Criar plataforma
router.post('/plataformas', async (req, res) => {
  try {
    const { nome_plataforma } = req.body;
    if (!nome_plataforma) {
      return res.status(400).json({ error: 'Nome da plataforma é obrigatório.' });
    }
    const plataforma = await modelPlataforma.create({ nome_plataforma });
    res.status(201).json(plataforma);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar plataformas
router.get('/plataformas', async (req, res) => {
  try {
    const plataformas = await modelPlataforma.findAll();
    res.status(200).json(plataformas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;