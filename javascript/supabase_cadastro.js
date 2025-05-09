const SUPABASE_URL = 'https://qvewtetxejicqyqyqzcb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZXd0ZXR4ZWppY3F5cXlxemNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MzMxODAsImV4cCI6MjA2MjEwOTE4MH0.5rzHtStZvgCpP7iw3Jk6g-ibni6IH1OS-MtVdjgaZRY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('cadastro-form').addEventListener('submit', async function (e) {
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

  try {
    // 1. Criar o usuário na autenticação
    const { user, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: senha,
    });

    if (signUpError) {
      alert('Erro ao cadastrar: ' + signUpError.message);
      return;
    }

    // 2. Criar o perfil do usuário
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: user.id,
          nome: nome,
          cpf: cpf,
          telefone: telefone
        }
      ]);

    if (profileError) {
      alert('Erro ao criar perfil: ' + profileError.message);
      // Você pode querer implementar uma lógica para deletar o usuário criado em caso de erro
      return;
    }

    alert('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar.');
    window.location.href = 'login.html';

  } catch (err) {
    alert('Erro ao realizar cadastro: ' + err.message);
  }
});
