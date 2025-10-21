const cards = document.querySelectorAll('.card.perdido');
const cardsPorPagina = 5;
const totalPaginas = 3;

const paginationDotsContainer = document.querySelector('.pagination-dots');

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
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
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
