
app.post('/api/sacar', (req, res) => {
    const { valor } = req.body;
    if (!valor || valor <= 0) {
      return res.status(400).json({ erro: 'Valor inválido.' });
    }
    if (valor > carteira.saldo) {
      return res.status(400).json({ erro: 'Saldo insuficiente.' });
    }
    carteira.saldo -= valor;
    carteira.historico.push({ tipo: 'Saque', valor, data: new Date() });
    res.json({ saldo: carteira.saldo });
  });