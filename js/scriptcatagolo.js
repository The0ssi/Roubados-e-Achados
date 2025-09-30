function aplicarFiltros() {
      const categorias = Array.from(document.querySelectorAll('.filtro-categoria:checked')).map(c => c.value);
      const locais = Array.from(document.querySelectorAll('.filtro-local:checked')).map(l => l.value);
      const dataFiltro = document.getElementById('filtro-data').value;

      document.querySelectorAll('.item').forEach(item => {
        const categoria = item.dataset.categoria;
        const local = item.dataset.local;
        const data = item.dataset.data;

        let mostrar = true;

        if (categorias.length > 0 && !categorias.includes(categoria)) {
          mostrar = false;
        }
        if (locais.length > 0 && !locais.includes(local)) {
          mostrar = false;
        }
        if (dataFiltro && data !== dataFiltro) {
          mostrar = false;
        }

        item.style.display = mostrar ? 'block' : 'none';
      });
    }





document.querySelectorAll('.pagination .page-link').forEach(page => {
  page.addEventListener('click', function(event) {
    event.preventDefault();
    
    
    document.querySelectorAll('.pagination .page-item').forEach(item => {
      item.classList.remove('active');
    });

    this.parentElement.classList.add('active');

    let pageNumber = this.textContent; 
    console.log('Página selecionada:', pageNumber);
    
  });
});
