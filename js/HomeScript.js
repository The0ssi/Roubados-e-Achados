// Função para configurar a paginação para uma seção específica
function setupPagination(sectionSelector, cardSelector, cardsPorPagina, totalPaginas) {
  const cards = document.querySelectorAll(`${sectionSelector} ${cardSelector}`);
  const paginationDotsContainer = document.querySelector(`${sectionSelector} .pagination-dots`);

  // Limpa bolinhas anteriores
  paginationDotsContainer.innerHTML = '';

  // Cria bolinhas de acordo com o total de páginas
  for (let i = 0; i < totalPaginas; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    paginationDotsContainer.appendChild(dot);

    dot.addEventListener('click', () => {
      // Atualiza bolinhas ativas
      document.querySelectorAll(`${sectionSelector} .dot`).forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      // Exibe cards do grupo clicado
      cards.forEach((card, index) => {
        if (index >= i * cardsPorPagina && index < (i + 1) * cardsPorPagina) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Exibe os primeiros cards ao carregar
  cards.forEach((card, index) => {
    card.style.display = index < cardsPorPagina ? 'block' : 'none';
  });
}

// Paginação para a seção "Achados"
setupPagination('.produtos-section', '.card.achado', 5, 3);  // Ajuste conforme necessário

// Paginação para a seção "Perdidos"
setupPagination('.perdidos', '.card.perdido', 5, 3);  // Ajuste conforme necessário




// Selecionando todos os botões de filtro
const filtros = document.querySelectorAll('.filtro');
const filtroInicial = document.querySelector('.filtro.ativo'); // O botão "..."

filtros.forEach(filtro => {
  filtro.addEventListener('click', () => {
    // Remover a classe 'ativo' de todos os botões
    filtros.forEach(btn => btn.classList.remove('ativo'));
    
    // Adicionar a classe 'ativo' ao botão clicado
    filtro.classList.add('ativo');
    
    // Verificar se o filtro "..." foi clicado
    if (filtro !== filtroInicial) {
      // Quando "..." não for o ativo, esconder o botão "..."
      filtroInicial.style.display = 'none';
    } else {
      // Caso contrário, exibir o botão "..."
      filtroInicial.style.display = 'inline-block'; // ou 'block', depende do layout
    }
  });
});
