const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const { Imagem } = require('../model/modelImagem'); // Crie esse model conforme abaixo

// Configuração do multer para upload em memória
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Rota para upload de imagem
router.post('/upload-imagem', upload.single('imagem'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado' });
    }

    // Ensure directory exists
    const uploadDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
    const filepath = path.join(uploadDir, filename);

    await sharp(req.file.buffer)
      .resize(800) // max width
      .webp({ quality: 80 })
      .toFile(filepath);

    const imageUrl = `/uploads/${filename}`;
    
    res.json({
      url: imageUrl,
      message: 'Imagem enviada com sucesso'
    });

  } catch (error) {
    console.error('Erro no processamento da imagem:', error);
    res.status(500).json({ 
      message: 'Erro ao processar imagem',
      error: error.message 
    });
  }
});

module.exports = router;