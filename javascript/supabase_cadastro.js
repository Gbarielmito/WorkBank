document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('cadastro-form').addEventListener('submit', async function (e) {
    const SUPABASE_URL = 'https://qvewtetxejicqyqyqzcb.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZXd0ZXR4ZWppY3F5cXlxemNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MzMxODAsImV4cCI6MjA2MjEwOTE4MH0.5rzHtStZvgCpP7iw3Jk6g-ibni6IH1OS-MtVdjgaZRY';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    var { data: { user, session }, error } = await supabaseClient.auth.signUp({
      email,
      password: senha,
    })
    if(error){
      alert('Erro ao cadastrar o usuario: ' + JSON.stringify(error));
      return;
    }

    var { error } = await supabaseClient
      .from('profiles')
      .insert({
        id: user.id,
        nome,
        cpf,
        telefone,
      })
    
    if(error){
      alert('Erro ao cadastrar profile: ' + JSON.stringify(error));
      return;
    }


      alert('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar.');
      window.location.href = 'login.html';

    
    
  });
});


