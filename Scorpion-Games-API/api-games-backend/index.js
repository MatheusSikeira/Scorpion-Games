const express = require('express');
const cors = require('cors');

const routerUsuario = require('./route/routesUsuarios');
const routesCategoria = require('./route/routesCategoria');
const routesjogos = require('./route/routesJogos');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', routerUsuario);
app.use('/', routesCategoria);
app.use('/', routesjogos);

app.listen(5000, ()=>{
    console.log('SERVIDOR RODANDO EM - http://localhost:5000');
});