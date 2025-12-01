// scriptRetirada.js

document.getElementById('retiradaForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os dados do formulário
    const cpfAluno = document.getElementById('cpfAluno').value;
    const dataRetirada = document.getElementById('dataRetirada').value;
    const nomeAluno = document.getElementById('nomeAluno').value;
    const itemPerdido = document.getElementById('itemPerdido').value;
    const idItem = document.getElementById('idItem').value;
    const funcionario = document.getElementById('funcionario').value;

    // Valida se o ID do item foi preenchido
    if (!idItem) {
        alert('Por favor, informe o ID do item.');
        return;
    }

    // Faz a requisição para o servidor
    fetch('http://localhost:3000/api/retiradas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Item_idItem: idItem,
            data: dataRetirada,
            funcionario: funcionario
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert('Retirada registrada com sucesso!');
            // Limpa o formulário
            document.getElementById('retiradaForm').reset();
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao registrar a retirada.');
    });
});