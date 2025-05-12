app.post('/api/depositar', (req, res) => {
    const { valor } = req.body;
    if (!valor || valor <= 0) {
      return res.status(400).json({ erro: 'Valor inválido.' });
    }
    carteira.saldo += valor;
    carteira.historico.push({ tipo: 'Depósito', valor, data: new Date() });
    res.json({ saldo: carteira.saldo });
  });