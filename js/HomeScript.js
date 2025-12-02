// Função para configurar a paginação para uma seção específica
function setupPagination(sectionSelector, cardSelector, cardsPorPagina) {
  const cards = document.querySelectorAll(`${sectionSelector} ${cardSelector}`);
  const paginationDotsContainer = document.querySelector(`${sectionSelector} .pagination-dots`);

  if (!paginationDotsContainer) return;

  const totalCards = cards.length;

  // Calcula total de páginas automaticamente
  let totalPaginas = Math.ceil(totalCards / cardsPorPagina);

  // Limita entre 1 e 3
  totalPaginas = Math.max(1, Math.min(totalPaginas, 3));

  // Limpa bolinhas anteriores
  paginationDotsContainer.innerHTML = '';

  // Cria bolinhas
  for (let i = 0; i < totalPaginas; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    paginationDotsContainer.appendChild(dot);

    dot.addEventListener('click', () => {
      // Atualiza bolinha ativa
      paginationDotsContainer
        .querySelectorAll('.dot')
        .forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      // Mostra cards da página clicada
      cards.forEach((card, index) => {
        const inicio = i * cardsPorPagina;
        const fim = inicio + cardsPorPagina;

        card.style.display =
          index >= inicio && index < fim ? 'block' : 'none';
      });
    });
  }

  // Mostra os primeiros cards ao carregar
  cards.forEach((card, index) => {
    card.style.display = index < cardsPorPagina ? 'block' : 'none';
  });
}
setTimeout(() => {
  setupPagination('.produtos-section', '.card.achado', 5);
  setupPagination('.perdidos', '.card.perdido', 5);
}, 500);




// Verifica se está logado
const isLoggedIn = sessionStorage.getItem("isLoggedIn");
const isAdmin = sessionStorage.getItem("isAdmin") === "true"; 

// Seleciona o botão
const registerButton = document.querySelector(".register-button");

// Caso não esteja logado → opcional redirecionar
if (!isLoggedIn) {
    console.warn("Usuário não está logado!");
    // window.location.href = "login.html"; // Se quiser forçar login
}

// SE FOR ALUNO
if (!isAdmin) {
    registerButton.textContent = "Ver todos itens";
    registerButton.href = "Catalogo.html";   // coloque o nome da sua página de catálogo
}

function abrirDetalhes(id) {
    window.location.href = `detalhes.html?id=${id}`;
}

// Função para carregar os itens da API e gerar os cards
// Função para carregar os itens da API e gerar os cards
async function carregarItens() {
    try {
        const response = await fetch('http://localhost:3000/api/itens');
        const dados = await response.json();

        itens = dados.data;

        if (!itens || itens.length === 0) return;

        const containerAchados = document.querySelector("#cardsAchados");
        const containerPerdidos = document.querySelector("#cardsPerdidos");
        containerAchados.innerHTML = "";
        containerPerdidos.innerHTML = "";

        // Divisão entre Achados e Perdidos
        itens.forEach(item => {

            // ❌ NÃO MOSTRA RETIRADOS
            if (item.status === "Retirado") return;

            const isAchado = item.status === "Achado";
            const isPerdido = item.status === "Perdido";

            // Se não for achado nem perdido, ignora
            if (!isAchado && !isPerdido) return;

            const container = isAchado ? containerAchados : containerPerdidos;

            const card = `
              <article class="card ${isAchado ? 'achado' : 'perdido'}" 
                      data-id="${item.id}" 
                      onclick="abrirDetalhes(${item.id})">
                  <header class="card-top">
                      <h3>${item.nome}</h3>
                  </header>
                    <div class="card-body">
                        <p class="descricao">${item.descricao}</p>

                        <div class="meta">
                            <div class="meta-item">
                                <i class="fa-solid fa-user" style="color: #ffffff;"></i>
                                ${item.Usuario_CPF}
                            </div>

                            <div class="meta-item">
                                <i class="fa-solid fa-location-dot" style="color: #ffffff;"></i>
                                ${item.local}
                            </div>
                        </div>

                        <div class="card-sep"></div>

                        <div class="card-footer">
                            <span class="pill">${item.Usuario_CPF}</span>
                            <span class="date">${new Date(item.data).toLocaleDateString("pt-BR")}</span>
                        </div>
                    </div>
                </article>
            `;

            container.innerHTML += card;
        });

        // PAGINAÇÃO
        setupPagination(
            '.produtos-section',
            '.card.achado',
            5,
            Math.ceil(itens.filter(i => i.status === "Achado").length / 5)
        );

        setupPagination(
            '.perdidos',
            '.card.perdido',
            5,
            Math.ceil(itens.filter(i => i.status === "Perdido").length / 5)
        );

    } catch (erro) {
        console.error("Erro ao carregar itens:", erro);
    }
}

carregarItens();

