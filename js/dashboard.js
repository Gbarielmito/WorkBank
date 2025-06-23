function flipCard() {
    const card = document.querySelector('.card-flip');
    card.classList.toggle('flipped');
  }

  // Alternância Débito/Crédito
  const btnTipo = document.getElementById('tipo-transferencia');
  let tipo = 'Débito';
  btnTipo.addEventListener('click', function() {
    if (tipo === 'Débito') {
      tipo = 'Crédito';
      btnTipo.textContent = 'Crédito';
      btnTipo.classList.remove('text-lime-400', 'border-lime-400', 'hover:bg-lime-400', 'hover:text-[#181A1B]');
      btnTipo.classList.add('text-blue-400', 'border-blue-400', 'hover:bg-blue-400', 'hover:text-[#181A1B]');
    } else {
      tipo = 'Débito';
      btnTipo.textContent = 'Débito';
      btnTipo.classList.remove('text-blue-400', 'border-blue-400', 'hover:bg-blue-400', 'hover:text-[#181A1B]');
      btnTipo.classList.add('text-lime-400', 'border-lime-400', 'hover:bg-lime-400', 'hover:text-[#181A1B]');
    }
  });

  // Toggle da Sidebar
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleSidebar');
  let isSidebarVisible = true;

  toggleBtn.addEventListener('click', () => {
    isSidebarVisible = !isSidebarVisible;
    if (isSidebarVisible) {
      sidebar.classList.remove('-translate-x-full');
      sidebar.classList.add('w-20', 'md:w-64');
    } else {
      sidebar.classList.add('-translate-x-full');
      sidebar.classList.remove('w-20', 'md:w-64');
    }
  });