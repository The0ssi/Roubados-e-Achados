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
