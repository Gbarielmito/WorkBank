document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const SUPABASE_URL = 'https://qvewtetxejicqyqyqzcb.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZXd0ZXR4ZWppY3F5cXlxemNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MzMxODAsImV4cCI6MjA2MjEwOTE4MH0.5rzHtStZvgCpP7iw3Jk6g-ibni6IH1OS-MtVdjgaZRY';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const erroDiv = document.getElementById('login-erro');

    try {
      console.log('Tentando login...');
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: senha,
      });
      console.log('Resultado login:', data, error);

      if (error) {
        erroDiv.textContent = 'E-mail ou senha incorretos.';
        erroDiv.classList.remove('hidden');
        return;
      }

      // 2. Carregar dados do perfil
      const { data: profile, error: profileError } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        erroDiv.textContent = 'Erro ao carregar perfil.';
        erroDiv.classList.remove('hidden');
        return;
      }

      // 3. Salvar dados do usuário e perfil
      localStorage.setItem('usuarioLogado', JSON.stringify({
        ...data.user,
        profile: profile
      }));

      window.location.href = 'dashboard.html';

    } catch (err) {
      erroDiv.textContent = 'Erro ao fazer login.';
      erroDiv.classList.remove('hidden');
    }
  });
});
