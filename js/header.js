// Pegando o nome salvo no localStorage
const userName = localStorage.getItem('currentUser');

// Pegando o elemento HTML que vai mostrar o nome
const userNameSpan = document.querySelector('.user-name');

// Se existir usuário, atualizar o texto
if (userNameSpan && userName) {
    userNameSpan.textContent = userName;
}
