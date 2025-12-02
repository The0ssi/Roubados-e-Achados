function changeTab(tab) {
    console.log("Aba selecionada:", tab);

    const line = document.querySelector('.line');
    const achados = document.getElementById("cardsAchados");
    const perdidos = document.getElementById("cardsPerdidos");

    // ====== mover linha laranja ======
    if (tab === "achado") {
        line.style.left = "0";
        line.style.width = "50%";
    } else {
        line.style.left = "50%";
        line.style.width = "50%";
    }

    // ====== mostrar lista correta ======
    achados.style.display = tab === "achado" ? "grid" : "none";
    perdidos.style.display = tab === "perdido" ? "grid" : "none";

    // ====== resetar paginação ======
    currentPage = 0;

    // ====== atualizar catálogo ======
    atualizarCatalogo();
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

