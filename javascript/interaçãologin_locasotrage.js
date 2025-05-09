document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const erroDiv = document.getElementById('login-erro');
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (usuario) {
      // Login bem-sucedido
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      window.location.href = 'dashboard.html';
    } else {
      erroDiv.textContent = 'E-mail ou senha incorretos.';
      erroDiv.classList.remove('hidden');
    }
  });