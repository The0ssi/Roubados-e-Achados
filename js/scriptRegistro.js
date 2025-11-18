function changeTab(tab) {
  const line = document.querySelector('.line');
  const tabs = document.querySelectorAll('.tab');

  // Selecionando o título, descrição e frase adicional
  const title = document.querySelector('.catalog-title');
  const description = document.querySelector('.catalog-description');
  const frase = document.querySelector('.catalogo-frase'); // Frase adicional

  if (tab === 'achado') {
    line.style.left = '0';
    line.style.width = '50%';
    
    // Atualizando título e descrição para "Achado"
    if (title) title.textContent = 'Registro dos itens achados';
    if (description) description.textContent = 'Registro de achados — seu item pode estar aqui.';
    if (frase) frase.textContent = 'Encontre itens que foram encontrados e estão esperando seus donos.';

  } else if (tab === 'perdido') {
    line.style.left = '50%';
    line.style.width = '50%';
    
    // Atualizando título e descrição para "Perdido"
    if (title) title.textContent = 'Registro dos itens perdidos';
    if (description) description.textContent = 'Registro de perdidos — seu item pode estar aqui.';
    if (frase) frase.textContent = 'Veja os itens perdidos e ajude-os a ser encontrados.';
  }

  const formulario = document.querySelector('.lost-item-form');
  formulario.classList.remove('achado', 'perdido');
  formulario.classList.add(tab);

  // Selecionando os elementos que precisam ser alterados
  const itemInput = formulario.querySelector('.item-input');
  const localSelect = formulario.querySelector('select[name="Local última vez visto"]');
  const periodoSelect = formulario.querySelector('select[name="Período última vez visto"]');

  if (tab === 'achado') {
    if (itemInput && itemInput.placeholder !== 'Objeto / Item achado') {
      itemInput.placeholder = 'Objeto / Item achado';
    }

    localSelect.querySelectorAll('option').forEach(option => {
      if (option.value === 'nao' && option.textContent !== 'Local que foi encontrado') {
        option.textContent = 'Local que foi encontrado';
      }
    });

    periodoSelect.querySelectorAll('option').forEach(option => {
      if (option.value === 'nao' && option.textContent !== 'Período que foi encontrado') {
        option.textContent = 'Período que foi encontrado';
      }
    });
  } else if (tab === 'perdido') {
    if (itemInput && itemInput.placeholder !== 'Objeto / Item perdido') {
      itemInput.placeholder = 'Objeto / Item perdido';
    }

    localSelect.querySelectorAll('option').forEach(option => {
      if (option.value === 'nao' && option.textContent !== 'Local última vez visto') {
        option.textContent = 'Local última vez visto';
      }
    });

    periodoSelect.querySelectorAll('option').forEach(option => {
      if (option.value === 'nao' && option.textContent !== 'Período última vez visto') {
        option.textContent = 'Período última vez visto';
      }
    });
  }

  console.log("A aba selecionada é: " + tab);
}
