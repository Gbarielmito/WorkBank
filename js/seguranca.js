// alternar a exibição dos tipos de fraude
function toggleFraudes() {
  const cardsFraudes = document.getElementById('cards-fraudes');
  const button = document.getElementById('toggle-fraudes');
  
  if (cardsFraudes.classList.contains('hidden')) {
    cardsFraudes.classList.remove('hidden');
    button.textContent = 'Ocultar Tipos de Fraude';
  } else {
    cardsFraudes.classList.add('hidden');
    button.textContent = 'Ver Tipos de Fraude';
  }
}

// Verificador de força de senha
document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.getElementById('password-input');
  const strengthBar = document.getElementById('strength-bar');
  const strengthText = document.getElementById('strength-text');

  // Garantir que o campo esteja vazio
  if (passwordInput) {
    passwordInput.value = '';
    passwordInput.focus();
  }

  // Prevenir comportamento padrão do formulário
  const passwordForm = document.getElementById('password-form');
  if (passwordForm) {
    passwordForm.addEventListener('submit', function(e) {
      e.preventDefault();
    });
  }

  passwordInput.addEventListener('input', function() {
    const password = this.value;
    let strength = 0;
    let feedback = '';

    // Verificar comprimento
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;

    // Verificar se contém números
    if (/\d/.test(password)) strength += 25;

    // Verificar se contém letras maiúsculas e minúsculas
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;

    // Verificar se contém caracteres especiais
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;

    // Atualizar barra de força
    strengthBar.style.width = strength + '%';

    // Definir cor e texto baseado na força
    if (strength <= 25) {
      strengthBar.style.backgroundColor = '#ef4444'; // red-500
      feedback = 'Muito fraca';
    } else if (strength <= 50) {
      strengthBar.style.backgroundColor = '#f97316'; // orange-500
      feedback = 'Fraca';
    } else if (strength <= 75) {
      strengthBar.style.backgroundColor = '#eab308'; // yellow-500
      feedback = 'Média';
    } else if (strength <= 100) {
      strengthBar.style.backgroundColor = '#22c55e'; // green-500
      feedback = 'Forte';
    } else {
      strengthBar.style.backgroundColor = '#10b981'; // emerald-500
      feedback = 'Muito forte';
    }

    strengthText.textContent = feedback;
  });
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animação de entrada para os cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar todos os cards
document.querySelectorAll('.bg-\\[\\#1F2123\\]').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});
