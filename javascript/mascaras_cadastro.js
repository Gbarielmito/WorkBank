    // Máscara para CPF
      document.getElementById('cpf').addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
        e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + (x[3] ? '.' + x[3] : '') + (x[4] ? '-' + x[4] : '');
      });

      // Máscara para telefone
      document.getElementById('telefone').addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      });

      // Validação do formulário
      document.getElementById('cadastro-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;
        
        if (senha !== confirmarSenha) {
          alert('As senhas não coincidem!');
          return;
        }

        // Verifica se já existe usuário com o mesmo email
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        if (usuarios.some(u => u.email === email)) {
          alert('Já existe uma conta cadastrada com este e-mail.');
          return;
        }

        // Salva o novo usuário
        usuarios.push({ nome, email, cpf, telefone, senha });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Cadastro realizado com sucesso! Agora você pode fazer login.');
        window.location.href = 'login.html';
      });