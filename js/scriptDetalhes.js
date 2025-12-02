function changeTab(tab) {
  const line = document.querySelector('.line');
  const tabs = document.querySelectorAll('.tab');

  if (tab === 'achado') {
    line.style.left = '0';
    line.style.width = '50%';
  } else if (tab === 'perdido') {
    line.style.left = '50%';
    line.style.width = '50%';
  }

  const returnText = document.querySelector('.return-text');
  const title = returnText.querySelector('h2');
  const paragraph = returnText.querySelector('p');

  if (tab === 'achado') {
    title.textContent = 'Catálogo dos itens achados';
    paragraph.textContent = 'Catálogo de achados — seu item pode estar aqui.';
  } else if (tab === 'perdido') {
    title.textContent = 'Catálogo dos itens perdidos';
    paragraph.textContent = 'Catálogo de perdidos — o item pode estar aqui.';
  }
  console.log("A aba selecionada é: " + tab);
}


// scriptDetalhes.js - substitua todo o arquivo por este
console.log('[detalhes] scriptDetalhes.js carregado');

document.addEventListener('DOMContentLoaded', async () => {
  console.log('[detalhes] DOM carregado');

  // 1) tenta pegar id da query string
  const params = new URLSearchParams(window.location.search);
  let idItem = params.get('id');
  console.log('[detalhes] id vindo da query string:', idItem);

  // 2) fallback: tenta pegar do localStorage (caso abrir diretamente sem query)
  if (!idItem) {
    try {
      const stored = localStorage.getItem('itemSelecionado');
      console.log('[detalhes] sem id na URL, localStorage itemSelecionado:', stored);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.idItem || parsed.id)) {
          idItem = parsed.idItem || parsed.id;
          console.log('[detalhes] id obtido via localStorage:', idItem);
        } else {
          // se o objeto do localStorage tiver a forma direta (nome, descricao...) podemos preencher direto
          console.log('[detalhes] localStorage parece conter objeto com dados completos, preenchendo direto');
          preencherCampos(parsed);
          return;
        }
      }
    } catch (e) {
      console.error('[detalhes] erro ao ler localStorage:', e);
    }
  }

  if (!idItem) {
    console.warn('[detalhes] nenhum id disponível — nada a buscar.');
    return;
  }

  // 3) tenta buscar item da API
  const apiBase = 'http://localhost:3000'; // ajuste se rodar em outra porta/host
  const endpointAll = `${apiBase}/api/itens`;
  console.log('[detalhes] buscando itens em:', endpointAll);

  try {
    const resp = await fetch(endpointAll);
    console.log('[detalhes] fetch feito, status:', resp.status, resp.statusText);

    if (!resp.ok) {
      const text = await resp.text();
      console.error('[detalhes] resposta não OK da API:', resp.status, text);
      return;
    }

    const json = await resp.json();
    console.log('[detalhes] JSON recebido da API:', json);

    // estrutura esperada: { data: [ ... ] }
    const lista = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : null);
    if (!lista) {
      console.error('[detalhes] formato inesperado da resposta. Esperado array em json.data ou json.', json);
      return;
    }

    const item = lista.find(i => String(i.idItem) === String(idItem) || String(i.id) === String(idItem));
    console.log('[detalhes] item encontrado para id=', idItem, item);

    if (!item) {
      console.warn('[detalhes] item não encontrado na lista. Confira se o id existe no banco.');
      return;
    }

    // salvar no localStorage como cache útil
    try {
      localStorage.setItem('itemSelecionado', JSON.stringify(item));
      console.log('[detalhes] item salvo em localStorage (itemSelecionado)');
    } catch (e) {
      console.warn('[detalhes] não foi possível salvar no localStorage:', e);
    }

    preencherCampos(item);

  } catch (err) {
    console.error('[detalhes] erro na requisição/fetch:', err);
  }
});

/**
 * Preenche os elementos da página com os dados do item.
 * Recebe um objeto com os campos: nome, descricao, local, data, periodo, Usuario_CPF, idItem, imagem
 */
function preencherCampos(item) {
  console.log('[detalhes] preenchendo campos com:', item);

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`[detalhes] elemento #${id} não encontrado no DOM`);
      return;
    }
    el.textContent = value ?? '';
  };

  setText('det-nome', item.nome ?? item.nome_item ?? 'Sem nome');
  setText('det-descricao', item.descricao ?? 'Sem descrição disponível');
  setText('det-local', item.local ?? 'Desconhecido');
  setText('det-data', item.data ?? 'Desconhecido');
  setText('det-periodo', item.periodo ?? 'Desconhecido');
  setText('det-usuario', item.Usuario_CPF ?? item.usuario ?? 'Desconhecido');
  setText('det-id', item.idItem ?? item.id ?? '---');
}

// Verifica login e tipo de usuário
const isLoggedIn = sessionStorage.getItem("isLoggedIn");
const isAdmin = sessionStorage.getItem("isAdmin") === "true";

// Seleciona o botão
const registerButton = document.querySelector(".register-button");

// Segurança: se o botão não existir
if (!registerButton) {
  console.warn("Botão não encontrado");
}

// Se NÃO for admin (ou seja, for aluno)
if (!isAdmin) {
  registerButton.style.display = "none";
}



// Função para carregar os itens da API e gerar os cards
async function carregarItens() {
    try {
        const response = await fetch('http://localhost:3000/api/itens');
        const dados = await response.json();

        itens = dados.data;

        if (!itens || itens.length === 0) return;

        const containerAchados = document.querySelector("#cardsAchados");
        const containerPerdidos = document.querySelector("#cardsAchados");
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

