const API_URL = 'http://localhost:5000/api';
let faturas = [];
let faturaEditando = null;


document.addEventListener('DOMContentLoaded', () => {
    carregarFaturas();
    
    // Adicionar evento ao botão Nova Fatura
    const btnNovaFatura = document.querySelector('button:contains("Nova Fatura")');
    if (btnNovaFatura) {
        btnNovaFatura.addEventListener('click', () => abrirModal());
    }
});

// Funções do popup
function abrirModal(fatura = null) {
    const modal = document.getElementById('modalFatura');
    const titulo = document.getElementById('modalTitulo');
    const form = document.getElementById('formFatura');
    const btnSalvar = form.querySelector('button[type="submit"]');
    
    if (fatura) {
        titulo.textContent = 'Editar Fatura';
        document.getElementById('faturaId').value = fatura.id;
        document.getElementById('cliente').value = fatura.cliente;
        document.getElementById('data').value = fatura.data;
        document.getElementById('valor').value = fatura.valor;
        document.getElementById('status').value = fatura.status;
        faturaEditando = fatura;
        btnSalvar.textContent = 'Atualizar';
    } else {
        titulo.textContent = 'Nova Fatura';
        form.reset();
        document.getElementById('faturaId').value = '';
        faturaEditando = null;
        btnSalvar.textContent = 'Salvar';
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function fecharModal() {
    const modal = document.getElementById('modalFatura');
    const form = document.getElementById('formFatura');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    form.reset();
    faturaEditando = null;
}

// Funções de CRUD
async function carregarFaturas() {
    try {
        const response = await fetch(`${API_URL}/faturas`);
        faturas = await response.json();
        atualizarTabela();
    } catch (erro) {
        console.error('Erro ao carregar faturas:', erro);
        alert('Erro ao carregar faturas');
    }
}

async function criarFatura(dados) {
    try {
        const response = await fetch(`${API_URL}/faturas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        
        if (response.ok) {
            await carregarFaturas();
            fecharModal();
            mostrarNotificacao('Fatura criada com sucesso!', 'sucesso');
        } else {
            throw new Error('Erro ao criar fatura');
        }
    } catch (erro) {
        console.error('Erro ao criar fatura:', erro);
        mostrarNotificacao('Erro ao criar fatura', 'erro');
    }
}

async function atualizarFatura(id, dados) {
    try {
        const response = await fetch(`${API_URL}/faturas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        
        if (response.ok) {
            await carregarFaturas();
            fecharModal();
            mostrarNotificacao('Fatura atualizada com sucesso!', 'sucesso');
        } else {
            throw new Error('Erro ao atualizar fatura');
        }
    } catch (erro) {
        console.error('Erro ao atualizar fatura:', erro);
        mostrarNotificacao('Erro ao atualizar fatura', 'erro');
    }
}

async function excluirFatura(id) {
    if (!confirm('Tem certeza que deseja excluir esta fatura?')) return;
    
    try {
        const response = await fetch(`${API_URL}/faturas/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            await carregarFaturas();
            mostrarNotificacao('Fatura excluída com sucesso!', 'sucesso');
        } else {
            throw new Error('Erro ao excluir fatura');
        }
    } catch (erro) {
        console.error('Erro ao excluir fatura:', erro);
        mostrarNotificacao('Erro ao excluir fatura', 'erro');
    }
}

//  mostra notificações
function mostrarNotificacao(mensagem, tipo) {
    const notificacao = document.createElement('div');
    notificacao.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white ${
        tipo === 'sucesso' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notificacao.textContent = mensagem;
    
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.remove();
    }, 3000);
}

// Atualizar tabela
function atualizarTabela() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    
    faturas.forEach(fatura => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-[#232526] transition';
        tr.innerHTML = `
            <td class="py-4">${fatura.numero}</td>
            <td>${fatura.cliente}</td>
            <td>${fatura.data}</td>
            <td>R$ ${parseFloat(fatura.valor).toFixed(2)}</td>
            <td><span class="px-3 py-1 rounded-full text-xs ${
                fatura.status === 'Pago' ? 'bg-green-900 text-green-400' :
                fatura.status === 'Pendente' ? 'bg-yellow-900 text-yellow-400' :
                'bg-red-900 text-red-400'
            }">${fatura.status}</span></td>
            <td>
                <div class="flex gap-2">
                    <button onclick="editarFatura(${fatura.id})" class="text-blue-400 hover:text-blue-500" title="Editar">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </button>
                    <button onclick="excluirFatura(${fatura.id})" class="text-red-400 hover:text-red-500" title="Excluir">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// editar fatura
function editarFatura(id) {
    const fatura = faturas.find(f => f.id === id);
    if (fatura) {
        abrirModal(fatura);
    }
}

// Event Listeners
document.getElementById('formFatura').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const dados = {
        cliente: document.getElementById('cliente').value,
        data: document.getElementById('data').value,
        valor: document.getElementById('valor').value,
        status: document.getElementById('status').value
    };
    
    if (faturaEditando) {
        await atualizarFatura(faturaEditando.id, dados);
    } else {
        await criarFatura(dados);
    }
});
