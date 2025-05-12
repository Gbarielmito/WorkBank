console.log('atividades.js carregado');

// Função para registrar histórico de depósito ou saque no backend
function registrarHistorico(tipo, valor) {
  fetch('http://localhost:3001/api/historico', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tipo: tipo, // 'deposito' ou 'saque'
      valor: valor,
      data: new Date().toLocaleString('pt-BR')
    })
  });
}

// Função para carregar e exibir o histórico na página de atividades
async function carregarHistorico() {
  const resp = await fetch('/api/historico');
  const historico = await resp.json();
  const container = document.getElementById('atividades-lista');
  if (!container) return;
  container.innerHTML = '';
  historico.reverse().forEach(item => {
    let cor, sinal, tipoLabel;
    if (item.tipo === 'deposito') {
      cor = 'green';
      sinal = '+';
      tipoLabel = 'Depósito';
    } else if (item.tipo === 'saque') {
      cor = 'red';
      sinal = '-';
      tipoLabel = 'Saque';
    } else {
      cor = 'yellow';
      sinal = '';
      tipoLabel = item.tipo;
    }
    container.innerHTML += `
      <div class="flex justify-between items-center py-3">
        <div class="flex items-center gap-3">
          <span class="w-3 h-3 rounded-full bg-${cor}-400"></span>
          <span>${tipoLabel}</span>
        </div>
        <span class="text-xs text-gray-400">${item.data}</span>
        <span class="font-bold text-${cor}-400">${sinal}R$ ${Number(item.valor).toFixed(2)}</span>
      </div>
    `;
  });
}

// Carregar histórico automaticamente na página de atividades
if (window.location.pathname.includes('atividades.html')) {
  window.onload = carregarHistorico;
}

// Exporte as funções para uso em outros scripts
window.registrarHistorico = registrarHistorico;
window.carregarHistorico = carregarHistorico; 