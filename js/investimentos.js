// formata o valor de acordo com a moeda
window.formatarValor = function(valor, moeda) {
    try {
        const formatadores = {
            'BRL': (v) => `R$ ${v.toFixed(2)}`,
            'USD': (v) => `$ ${v.toFixed(2)}`,
            'EUR': (v) => `€ ${v.toFixed(2)}`,
            'BTC': (v) => `₿ ${v.toFixed(8)}`,
            'ETH': (v) => `Ξ ${v.toFixed(8)}`
        };
        
        return formatadores[moeda] ? formatadores[moeda](valor) : valor;
    } catch (error) {
        console.error('Erro ao formatar valor:', error);
        return valor;
    }
}

// salva investimentos no localStorage
window.salvarInvestimentos = function(investimentos) {
    try {
        localStorage.setItem('investimentos', JSON.stringify(investimentos));
    } catch (error) {
        console.error('Erro ao salvar investimentos:', error);
    }
}

// carrega investimentos do localStorage
window.carregarInvestimentos = function() {
    try {
        const investimentos = JSON.parse(localStorage.getItem('investimentos')) || [];
        return investimentos;
    } catch (error) {
        console.error('Erro ao carregar investimentos:', error);
        return [];
    }
}

// adiciona um novo investimento
window.adicionarInvestimento = function(nome, valor, moeda, vencimento = null, quantidade = null) {
    try {
        const investimentosContainer = document.getElementById('listaInvestimentos');
        if (!investimentosContainer) {
            console.error('Container de investimentos não encontrado');
            return;
        }

        const novoInvestimento = document.createElement('div');
        novoInvestimento.className = 'flex items-center justify-between p-4 bg-[#232526] rounded-xl';
        
        const iconeCor = {
            'BRL': 'bg-blue-400',
            'USD': 'bg-yellow-400',
            'EUR': 'bg-green-400',
            'BTC': 'bg-orange-400',
            'ETH': 'bg-purple-400'
        }[moeda] || 'bg-blue-400';

        novoInvestimento.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full ${iconeCor} flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <div>
                    <h3 class="font-bold">${nome}</h3>
                    ${vencimento ? `<p class="text-sm text-gray-400">Vencimento: ${vencimento}</p>` : ''}
                    ${quantidade ? `<p class="text-sm text-gray-400">${quantidade}</p>` : ''}
                    <p class="text-xs text-gray-400">Moeda: ${moeda}</p>
                </div>
            </div>
            <div class="text-right">
                <p class="font-bold text-lime-400">${formatarValor(valor, moeda)}</p>
                <p class="text-sm text-green-400">+10%</p>
            </div>
        `;

        investimentosContainer.insertBefore(novoInvestimento, investimentosContainer.firstChild);
    } catch (error) {
        console.error('Erro ao adicionar investimento:', error);
    }
}

// confirma o investimento
window.confirmarInvestimento = function() {
    try {
        const valor = parseFloat(document.getElementById('valorInvestimento').value);
        const moeda = document.getElementById('moedaInvestimento').value;
        
        if (isNaN(valor) || valor <= 0) {
            alert('Por favor, insira um valor válido para o investimento.');
            return;
        }

        // Gerar um nome único para o investimento
        const dataAtual = new Date();
        const nomeInvestimento = `Investimento ${dataAtual.toLocaleDateString()}`;

        // Criar objeto do investimento
        const novoInvestimento = {
            nome: nomeInvestimento,
            valor: valor,
            moeda: moeda,
            data: dataAtual.toISOString()
        };

        // Carregar investimentos existentes
        const investimentos = carregarInvestimentos();
        
        // Adicionar novo investimento
        investimentos.push(novoInvestimento);
        
        // Salvar investimentos
        salvarInvestimentos(investimentos);

        // Adicionar o novo investimento à interface
        adicionarInvestimento(nomeInvestimento, valor, moeda);
        
        // Atualizar o saldo total
        atualizarSaldoTotal(valor, moeda);
        
        // Fechar o modal e limpar os campos
        if (typeof fecharModal === 'function') {
            fecharModal('modalInvestir');
        } else {
            document.getElementById('modalInvestir').classList.add('hidden');
        }
        
        document.getElementById('valorInvestimento').value = '';
        document.getElementById('moedaInvestimento').value = 'BRL';
    } catch (error) {
        console.error('Erro ao confirmar investimento:', error);
        alert('Ocorreu um erro ao processar o investimento. Por favor, tente novamente.');
    }
}

// atualiza o saldo total
window.atualizarSaldoTotal = function(valor, moeda) {
    try {
        const saldoTotalElement = document.getElementById('saldoTotal');
        if (!saldoTotalElement) return;

        const saldoAtual = parseFloat(saldoTotalElement.textContent.replace(/[^0-9.-]+/g, '')) || 0;
        const novoSaldo = saldoAtual + valor;
        saldoTotalElement.textContent = formatarValor(novoSaldo, moeda);
    } catch (error) {
        console.error('Erro ao atualizar saldo total:', error);
    }
}

// carrega todos os investimentos salvos
window.carregarTodosInvestimentos = function() {
    try {
        const investimentos = carregarInvestimentos();
        const container = document.getElementById('listaInvestimentos');
        
        // Limpar container antes de adicionar os investimentos
        if (container) {
            container.innerHTML = '';
        }
        
        investimentos.forEach(investimento => {
            adicionarInvestimento(
                investimento.nome,
                investimento.valor,
                investimento.moeda
            );
        });
    } catch (error) {
        console.error('Erro ao carregar todos os investimentos:', error);
    }
}

// Inicialização quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('Inicializando investimentos...');
        
        
        carregarTodosInvestimentos();

        // Configura botão de investir
        const botaoInvestir = document.querySelector('.acao-rapida:nth-child(4)');
        if (botaoInvestir) {
            botaoInvestir.addEventListener('click', function() {
                document.getElementById('modalInvestir').classList.remove('hidden');
            });
        }

        console.log('Inicialização concluída');
    } catch (error) {
        console.error('Erro na inicialização:', error);
    }
}); 