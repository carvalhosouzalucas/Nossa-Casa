// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Caminho do arquivo onde as inscrições serão salvas
const DB_PATH = './inscricoes.json';

// Função auxiliar para ler/escrever arquivo
function salvarInscricao(tipo, dados) {
  let db = {};
  if (fs.existsSync(DB_PATH)) {
    db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  }
  if (!db[tipo]) db[tipo] = [];
  db[tipo].push(dados);
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

// Rota para curso de inglês
app.post('/api/inscricao-ingles', (req, res) => {
  const dados = req.body;
  if (!dados.nome || !dados.email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
  }
  salvarInscricao('ingles', dados);
  res.json({ message: 'Inscrição no curso de inglês enviada com sucesso!' });
});

// Rota para curso de música
app.post('/api/inscricao-musica', (req, res) => {
  const dados = req.body;
  if (!dados.nome || !dados.email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
  }
  salvarInscricao('musica', dados);
  res.json({ message: 'Inscrição no curso de música enviada com sucesso!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
