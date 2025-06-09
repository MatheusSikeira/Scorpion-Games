const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const routerUsuario = require('./route/routesUsuarios');
const routesCategoria = require('./route/routesCategoria');
const routesJogos = require('./route/routesJogos');
const routesPlataformas = require('./route/routesPlataformas'); // Corrigido aqui
const routesImagens = require('./route/routesImagens');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', routerUsuario);
app.use('/', routesCategoria);
app.use('/', routesJogos);
app.use('/', routesPlataformas); // Adicione esta linha para registrar as rotas de plataformas
app.use('/', routesImagens);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.listen(5000, ()=>{
    console.log('SERVIDOR RODANDO EM - http://localhost:5000');
});