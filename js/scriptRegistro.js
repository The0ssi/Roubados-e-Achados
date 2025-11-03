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

  const formulario = document.querySelector('.lost-item-form');
  formulario.classList.remove('achado', 'perdido');
  formulario.classList.add(tab);

  // Selecionando os elementos que precisam ser alterados
  const itemInput = formulario.querySelector('.item-input');
  const localSelect = formulario.querySelector('select[name="Local última vez visto"]');
  const periodoSelect = formulario.querySelector('select[name="Período última vez visto"]');

  if (tab === 'achado') {
    // Verificando se o placeholder do "Objeto / Item" está correto e atualizando se necessário
    if (itemInput && itemInput.placeholder !== 'Objeto / Item achado') {
      itemInput.placeholder = 'Objeto / Item achado';
    }

    // Verificando e alterando as opções de "Local última vez visto"
    localSelect.querySelectorAll('option').forEach(option => {
      if (option.value === 'nao' && option.textContent !== 'Local que foi encontrado') {
        option.textContent = 'Local que foi encontrado';
      }
    });

    // Verificando e alterando as opções de "Período última vez visto"
    periodoSelect.querySelectorAll('option').forEach(option => {
      if (option.value === 'nao' && option.textContent !== 'Período que foi encontrado') {
        option.textContent = 'Período que foi encontrado';
      }
    });

  } else if (tab === 'perdido') {
    // Verificando se o placeholder do "Objeto / Item" está correto e atualizando se necessário
    if (itemInput && itemInput.placeholder !== 'Objeto / Item perdido') {
      itemInput.placeholder = 'Objeto / Item perdido';
    }

    // Verificando e alterando as opções de "Local última vez visto"
    localSelect.querySelectorAll('option').forEach(option => {
      if (option.value === 'nao' && option.textContent !== 'Local última vez visto') {
        option.textContent = 'Local última vez visto';
      }
    });

    // Verificando e alterando as opções de "Período última vez visto"
    periodoSelect.querySelectorAll('option').forEach(option => {
      if (option.value === 'nao' && option.textContent !== 'Período última vez visto') {
        option.textContent = 'Período última vez visto';
      }
    });
  }

  console.log("A aba selecionada é: " + tab);
}
