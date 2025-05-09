const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Simulação de dados em memória
let carteira = {
  saldo: 0.00,
  investimentos: 0.00,
  saques: 0.00,
  historico: []
};

// Servir arquivos estáticos da pasta 'pages' e 'js' e 'css'
app.use(express.static(path.join(__dirname, '../pages')));
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/css', express.static(path.join(__dirname, '../css')));

// Redirecionar '/' para uma página inicial, por exemplo, 'carteira.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/carteira.html'));
});

// Consultar saldo e investimentos
app.get('/api/carteira', (req, res) => {
  res.json({ saldo: carteira.saldo, investimentos: carteira.investimentos, saques: carteira.saques });
});

// Consultar histórico
app.get('/api/historico', (req, res) => {
  res.json({ historico: carteira.historico });
});

app.post('/api/depositar', (req, res) => {
  const { valor } = req.body;
  if (valor > 0) {
    carteira.saldo += valor;
    carteira.historico.push({ tipo: 'Depósito', valor, data: new Date() });
    return res.json({ sucesso: true, saldo: carteira.saldo });
  }
  res.status(400).json({ sucesso: false, mensagem: 'Valor inválido' });
});

app.post('/api/sacar', (req, res) => {
  const { valor } = req.body;
  if (valor > 0 && valor <= carteira.saldo) {
    carteira.saldo -= valor;
    carteira.saques += valor;
    carteira.historico.push({ tipo: 'Saque', valor, data: new Date() });
    return res.json({ sucesso: true, saldo: carteira.saldo });
  }
  res.status(400).json({ sucesso: false, mensagem: 'Valor inválido ou saldo insuficiente' });
});

app.post('/api/transferir', (req, res) => {
  const { valor, destinatario } = req.body;
  if (valor > 0 && valor <= carteira.saldo) {
    carteira.saldo -= valor;
    carteira.historico.push({ tipo: 'Transferência', valor, destinatario, data: new Date() });
    return res.json({ sucesso: true, saldo: carteira.saldo });
  }
  res.status(400).json({ sucesso: false, mensagem: 'Valor inválido ou saldo insuficiente' });
});

app.post('/api/investir', (req, res) => {
  const { valor } = req.body;
  if (valor > 0 && valor <= carteira.saldo) {
    carteira.saldo -= valor;
    carteira.investimentos += valor;
    carteira.historico.push({ tipo: 'Investimento', valor, data: new Date() });
    return res.json({ sucesso: true, saldo: carteira.saldo, investimentos: carteira.investimentos });
  }
  res.status(400).json({ sucesso: false, mensagem: 'Valor inválido ou saldo insuficiente' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});