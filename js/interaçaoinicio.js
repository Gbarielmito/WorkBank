
document.getElementById('currency-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const from = document.getElementById('from-currency').value;
    const to = document.getElementById('to-currency').value;
    const amount = document.getElementById('amount').value.trim();
    const resultDiv = document.getElementById('conversion-result');

    // validação simples
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      resultDiv.textContent = 'Digite um valor válido maior que zero.';
      return;
    }
    if (from === to) {
      resultDiv.textContent = 'Selecione moedas diferentes para converter.';
      return;
    }

    resultDiv.textContent = 'Convertendo...';

    // converte a moeda
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
      const data = await res.json();
      if (data.rates && data.rates[to]) {
        resultDiv.textContent = `${amount} ${from} = ${data.rates[to].toFixed(2)} ${to}`;
      } else {
        resultDiv.textContent = 'Erro ao converter. Tente novamente.';
      }
    } catch (err) {
      resultDiv.textContent = 'Erro ao conectar à API.';
    }
  });

  // função para mostrar as dicas
  function toggleDicas() {
    const cards = document.getElementById('cards-dicas');
    const btn = document.getElementById('toggle-dicas');
    if (cards.classList.contains('hidden')) {
      cards.classList.remove('hidden');
      btn.textContent = 'Voltar';
    } else {
      cards.classList.add('hidden');
      btn.textContent = 'Dicas Rápidas';
    }
  }

  const comments = [
    { name: 'Angela', text: 'O WorkBank é meu parceiro financeiro de confiança há anos. Seu atendimento personalizado e suas soluções bancárias digitais inovadoras tornaram a gestão das minhas finanças muito mais fácil.' },
    { name: 'Gabriel', text: 'Recentemente, abri meu próprio negócio e o WorkBank tem sido fundamental para me ajudar a abrir minhas contas comerciais e garantir o financiamento necessário. Sua orientação especializada e soluções personalizadas foram inestimáveis.' },
    { name: 'Emily G', text: 'Adoro a praticidade do aplicativo de mobile banking WorkBank. Ele me permite maior controle das minhas finanças e fazer transações em qualquer lugar. O aplicativo é fácil de usar e seguro, o que me dá tranquilidade.' },
    { name: 'Lucas', text: 'O suporte ao cliente do WorkBank é excelente! Sempre que precisei de ajuda, fui atendido rapidamente e com muita atenção.' },
    { name: 'Marina', text: 'A interface do app é muito intuitiva e bonita. Consigo fazer tudo o que preciso sem complicação.' },
    {
      name: 'Angela',
      text: 'O WorkBank é meu parceiro financeiro de confiança há anos. Seu atendimento personalizado e suas soluções bancárias digitais inovadoras tornaram a gestão das minhas finanças muito mais fácil.',
    },
    {
      name: 'Gabriel',
      text: 'Recentemente, abri meu próprio negócio e o WorkBank tem sido fundamental para me ajudar a abrir minhas contas comerciais e garantir o financiamento necessário. Sua orientação especializada e soluções personalizadas foram inestimáveis.',
    },
    {
      name: 'Emily G',
      text: 'Adoro a praticidade do aplicativo de mobile banking WorkBank. Ele me permite maior controle das minhas finanças e fazer transações em qualquer lugar. O aplicativo é fácil de usar e seguro, o que me dá tranquilidade.',
    },
    {
      name: 'Lucas',
      text: 'O suporte ao cliente do WorkBank é excelente! Sempre que precisei de ajuda, fui atendido rapidamente e com muita atenção.',
    },
    {
      name: 'Marina',
      text: 'A interface do app é muito intuitiva e bonita. Consigo fazer tudo o que preciso sem complicação.',
    },
    {
      name: 'Carlos',
      text: 'As taxas do WorkBank são muito competitivas e as opções de investimento me ajudaram a crescer meu patrimônio.',
    },
];
  
  // função para renderizar os comentarios
  let start = 0;
  const perPage = 3;
  function renderComments() {
    const container = document.getElementById('comments-carousel');
    container.innerHTML = '';
    for (let i = start; i < Math.min(start + perPage, comments.length); i++) {
      const c = comments[i];
      container.innerHTML += `
        <div class='bg-[#1F2123] rounded-2xl p-8 flex flex-col items-center text-center shadow'>
          <svg class='w-8 h-8 text-lime-400 mb-4' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6A8.38 8.38 0 0112.5 3a8.5 8.5 0 018.5 8.5z' stroke-linecap='round' stroke-linejoin='round'/></svg>
          <p class='text-gray-300 mb-4'>${c.text}</p>
          <span class='text-lime-400 font-bold'>${c.name}</span>
        </div>
      `;
    }
  }
  document.getElementById('prev-comment').onclick = function() {
    start = Math.max(0, start - perPage);
    renderComments();
  };
  document.getElementById('next-comment').onclick = function() {
    if (start + perPage < comments.length) {
      start += perPage;
      renderComments();
    }
  };
  renderComments();

  // função para logar
  document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: senha,
    });

    if (error) {
      const erroDiv = document.getElementById('login-erro');
      erroDiv.textContent = 'E-mail ou senha incorretos.';
      erroDiv.classList.remove('hidden');
    } else {
      localStorage.setItem('usuarioLogado', JSON.stringify(user));
      window.location.href = 'dashboard.html';
    }
  });