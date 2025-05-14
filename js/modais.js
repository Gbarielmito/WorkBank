
function abrirModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

function fecharModal(id) {
  document.getElementById(id).classList.add('hidden');
}

// Funções de confirmações
async function confirmarDeposito() {

  const valor = Number(document.getElementById('valorDeposito').value);
  if (valor > 0) {
    await fetch('http://localhost:3001/api/depositar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valor })
    }); 
    fecharModal('modalDepositar');
    atualizarValoresCarteira();
    registrarHistorico('deposito', valor);
  }
}

async function confirmarSaque() {
  const valor = Number(document.getElementById('valorSaque').value);
  if (valor > 0) {
    await fetch('http://localhost:3001/api/sacar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valor })
    });
    fecharModal('modalSacar');
    atualizarValoresCarteira();
    registrarHistorico('saque', valor);
  }
}

async function confirmarTransferencia() {
  const valor = Number(document.getElementById('valorTransferencia').value);
  const destinatario = document.getElementById('destinoTransferencia').value;
  if (valor > 0 && destinatario) {
    await fetch('http://localhost:3001/api/transferir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valor, destinatario })
    });
    fecharModal('modalTransferir');
    atualizarValoresCarteira();
  }
}

async function confirmarInvestimento() {
  const valor = Number(document.getElementById('valorInvestimento').value);
  if (valor > 0) {
    await fetch('http://localhost:3001/api/investir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valor })
    });
    fecharModal('modalInvestir');
    atualizarValoresCarteira();
  }
}

// Atualiza os valores da carteira na tela
async function atualizarValoresCarteira() {
  try {
    const resposta = await fetch('http://localhost:3001/api/carteira');
    const dados = await resposta.json();
    document.getElementById('saldoTotal').textContent = `R$ ${Number(dados.saldo).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    document.getElementById('valorInvestimentos').textContent = `R$ ${Number(dados.investimentos).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    document.getElementById('valorSaques').textContent = `R$ ${Number(dados.saques || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
  } catch (e) {
    console.error('Erro ao buscar valores da carteira:', e);
  }
}

// organiza os botoes no popup
window.addEventListener('DOMContentLoaded', function() {
  const botoes = document.querySelectorAll('.acao-rapida');
  if (botoes.length >= 4) {
    botoes[0].addEventListener('click', () => abrirModal('modalDepositar'));
    botoes[1].addEventListener('click', () => abrirModal('modalSacar'));
    botoes[2].addEventListener('click', () => abrirModal('modalTransferir'));
    botoes[3].addEventListener('click', () => abrirModal('modalInvestir'));
  }
  atualizarValoresCarteira();
});
