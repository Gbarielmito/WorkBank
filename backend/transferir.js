app.post('/api/transferir', (req, res) => {
    const { valor, destinatario } = req.body;
    if (!valor || valor <= 0 || !destinatario) {
      return res.status(400).json({ erro: 'Dados inválidos.' });
    }
    if (valor > carteira.saldo) {
      return res.status(400).json({ erro: 'Saldo insuficiente.' });
    }
    carteira.saldo -= valor;
    carteira.historico.push({ tipo: 'Transferência', valor, destinatario, data: new Date() });
    res.json({ saldo: carteira.saldo });
  });