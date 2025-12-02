function changeTab(tab) {
  console.log("Função changeTab chamada com:", tab);

  const line = document.querySelector('.line');
  const tabs = document.querySelectorAll('.tab');

  // Verificando se a linha e as abas existem
  if (!line || tabs.length === 0) {
    console.error("❌ Erro: Elementos de linha ou abas não encontrados!");
    return;
  }

  // Atualizando a posição da linha conforme a aba selecionada
  if (tab === 'achado') {
    console.log("Movendo linha para Achado...");
    line.style.left = '0';  // Move a linha para a esquerda (início)
    line.style.width = '50%';  // Linha ocupa 50% da largura
  } else if (tab === 'perdido') {
    console.log("Movendo linha para Perdido...");
    line.style.left = '50%';  // Move a linha para 50% (direita)
    line.style.width = '50%';  // Linha ocupa os outros 50% da largura
  }

  // Verificando se o título e a descrição devem ser alterados
  const title = document.querySelector('.catalog-title');
  const description = document.querySelector('.catalog-description');
  const frase = document.querySelector('.catalogo-frase');

  if (tab === 'achado') {
    if (title) title.textContent = 'Registro dos itens achados';
    if (description) description.textContent = 'Registro de achados — seu item pode estar aqui.';
    if (frase) frase.textContent = 'Encontre itens que foram encontrados e estão esperando seus donos.';
  } else if (tab === 'perdido') {
    if (title) title.textContent = 'Registro dos itens perdidos';
    if (description) description.textContent = 'Registro de perdidos — seu item pode estar aqui.';
    if (frase) frase.textContent = 'Veja os itens perdidos e ajude-os a ser encontrados.';
  }

  // Controlando a visibilidade das listas de itens
  const achados = document.getElementById("cardsAchados");
  const perdidos = document.getElementById("cardsPerdidos");

  if (!achados || !perdidos) {
    console.error("❌ Containers de cards não encontrados!");
    return;
  }

  if (tab === 'achado') {
    achados.style.display = "grid";
    perdidos.style.display = "none";
  } else if (tab === 'perdido') {
    achados.style.display = "none";
    perdidos.style.display = "grid";
  }

  console.log("A aba selecionada é:", tab);
}




function toggleMenuFiltros() {
    const menu = document.getElementById("menu-filtros-mobile");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// Clonar conteúdo do aside (filtros completos) e jogar dentro do menu mobile
document.addEventListener("DOMContentLoaded", () => {
    const asideFiltros = document.querySelector(".filtro-container");
    const destino = document.querySelector(".filtros-completos");

    if (asideFiltros && destino) {
        destino.innerHTML = asideFiltros.innerHTML;
    }
});
console.log("📌 scriptCatagolo.js carregado");

// =========================================
// 🔵 URL CORRETA DA API
// =========================================
 // Exibe 5 itens por página

// Variáveis de controle de paginação
let currentPage = 0;
const itemsPerPage = 6;

let itensAchados = [];
let itensPerdidos = [];

document.addEventListener("DOMContentLoaded", () => {
    carregarItens();
});

// ===============================
// BUSCAR ITENS DA API
// ===============================
async function carregarItens() {
    try {
        const response = await fetch("http://localhost:3000/api/itens");
        const dados = await response.json();

        itensAchados = dados.data.filter(i => i.status === "Achado");
        itensPerdidos = dados.data.filter(i => i.status === "Perdido");

        atualizarCatalogo();
    } catch (erro) {
        console.error("Erro ao buscar itens:", erro);
    }
}

// ===============================
// MOSTRAR CARDS DA PÁGINA ATUAL
// ===============================
function atualizarCatalogo() {

    const achadosContainer = document.getElementById("cardsAchados");
    const perdidosContainer = document.getElementById("cardsPerdidos");

    achadosContainer.innerHTML = "";
    perdidosContainer.innerHTML = "";

    const tabAtual = achadosContainer.style.display !== "none" ? "achado" : "perdido";
    const lista = tabAtual === "achado" ? itensAchados : itensPerdidos;

    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const itensPagina = lista.slice(start, end);

    itensPagina.forEach(item => {
        (tabAtual === "achado" ? achadosContainer : perdidosContainer)
            .innerHTML += criarCard(item);
    });

    gerarPaginacao(lista.length);
}

// ===============================
// GERAR PAGINAÇÃO AUTOMÁtica
// ===============================
function gerarPaginacao(totalItens) {
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(totalItens / itemsPerPage);

    // seta anterior
    const prev = criarBotaoSeta("prev", () => {
        if (currentPage > 0) {
            currentPage--;
            atualizarCatalogo();
        }
    });

    pagination.appendChild(prev);

    // números
    for (let i = 0; i < totalPages; i++) {
        const pageBtn = document.createElement("a");
        pageBtn.href = "#";
        pageBtn.textContent = i;
        pageBtn.classList.add("page-number");

        if (i === currentPage) pageBtn.classList.add("active");

        pageBtn.addEventListener("click", () => {
            currentPage = i;
            atualizarCatalogo();
        });

        pagination.appendChild(pageBtn);
    }

    // seta próxima
    const next = criarBotaoSeta("next", () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            atualizarCatalogo();
        }
    });

    pagination.appendChild(next);
}

// cria seta
function criarBotaoSeta(type, action) {
    const btn = document.createElement("a");
    btn.href = "#";
    btn.classList.add(type);
    btn.innerHTML = type === "prev" ? "&#10094;" : "&#10095;";
    btn.addEventListener("click", action);
    return btn;
}

// ===============================
// CRIAR CARD
// ===============================
function criarCard(item) {
    const temImagem = item.imagem && item.imagem.trim() !== "";
    return `
        <div class="card-item">
            <div class="card-img ${temImagem ? "" : "placeholder"}">
                ${temImagem ? `<img src="${item.imagem}">` : `<i class="fa-solid fa-images fa-xl" style="color:#4c47c8"></i>`}
                <span class="card-title">${item.nome}</span>
            </div>
            <p class="card-desc">${item.descricao || "Sem descrição"}</p>
            <div class="card-info">
                <p><i class="fa fa-user"></i> ${item.Usuario_CPF || "Não informado"}</p>
                <p><i class="fa fa-map-marker"></i> ${item.local || "Local não informado"}</p>
            </div>
        </div>
    `;
}

// ===============================
// MUDAR TABS (ACHADO/PERDIDO)
// ===============================
function changeTab(tipo) {
    currentPage = 0;

    document.getElementById("cardsAchados").style.display =
        tipo === "achado" ? "grid" : "none";

    document.getElementById("cardsPerdidos").style.display =
        tipo === "perdido" ? "grid" : "none";

    atualizarCatalogo();
}
