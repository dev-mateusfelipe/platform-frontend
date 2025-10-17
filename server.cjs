// server.cjs
// O PORTEIRO NODE.JS SOBERANO - VERSÃO 3.0 (ARQUITETURA DE CLOUD FUNCTION)
// Missão: Servir os arquivos estáticos do React e exportar o app para o GCF gerenciar a porta.

const express = require('express');
const path = require('path');
const app = express();

const BUILD_PATH = path.join(__dirname, 'dist');

// 1. Servir os arquivos estáticos (CSS, JS, imagens) da pasta 'dist'.
app.use(express.static(BUILD_PATH));

// 2. Rota Raiz: Para qualquer requisição, serve o index.html principal.
app.get('/', (req, res) => {
    res.sendFile(path.join(BUILD_PATH, 'index.html'));
});

// A CURA SOBERANA: Apenas exportamos o app. O Google Cloud Functions inicia o servidor.
exports.app = app;