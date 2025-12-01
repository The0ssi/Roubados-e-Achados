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

document.getElementById('formulario').addEventListener('submit', function(event) {
  event.preventDefault();  // Impede o envio padrão do formulário

  // Coleta os dados do formulário
  const nomeAluno = document.querySelector('input[name="nome_aluno"]').value;
  const matricula = document.querySelector('input[name="matricula"]').value;
  const itemAchado = document.querySelector('input[name="item_achado"]').value;
  const dataEncontrado = document.querySelector('input[name="data_encontrado"]').value;
  const localUltimaVezVisto = document.querySelector('select[name="local_ultima_vez_visto"]').value;
  const periodoUltimaVezVisto = document.querySelector('select[name="periodo_ultima_vez_visto"]').value;
  const descricaoItem = document.querySelector('textarea[name="descricao_item"]').value;

  // Captura as categorias (checkboxes)
  const categorias = [];
  document.querySelectorAll('input[name="categorias[]"]:checked').forEach(function(checkbox) {
    categorias.push(checkbox.value);
  });

  // Recupera o status da aba selecionada (achado ou perdido)
  const status = document.querySelector('.lost-item-form').classList.contains('achado') ? 'Achado' : 'Perdido';

  // Preparar o payload (dados) para enviar
  const payload = {
    nome: itemAchado,
    data: dataEncontrado,
    local: localUltimaVezVisto,
    periodo: periodoUltimaVezVisto,
    categoria: categorias.join(", "),  // Caso queira enviar as categorias como uma string separada por vírgula
    descricao: descricaoItem,
    status: status,  // Status baseado na aba selecionada
    Usuario_CPF: matricula  // Usando o número de matrícula como CPF (se for o caso)
  };

  // Enviar dados para o servidor usando fetch
  fetch('http://localhost:3000/api/itens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === "Item cadastrado") {
      alert("Item registrado com sucesso!");
      // Limpar o formulário após o sucesso
      document.getElementById('formulario').reset();
    } else {
      alert("Erro ao registrar o item: " + (data.error || "Erro desconhecido"));
    }
  })
  .catch(error => {
    console.error('Erro ao enviar dados:', error);
    alert("Erro de conexão. Tente novamente.");
  });
});

