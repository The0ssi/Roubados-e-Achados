/**
 * 1. DEFINIÇÃO DOS DADOS DOS USUÁRIOS
 * Array de Objetos que armazena o username, password e o cargo (isAdmin).
 */
const usersData = [
    {
        username: "carmem",
        password: "adm1234",
        isAdmin: true // Secretaria
    },
    {
        username: "ana",
        password: "1234",
        isAdmin: false // Aluno
    },
    {
        username: "teresa",
        password: "1234",
        isAdmin: false
    },
    {
        username: "win",
        password: "12346",
        isAdmin: false
    }
];

console.log("Dados de usuários carregados:", usersData);

// ----------------------------------------------------

/**
 * 2. LÓGICA DE LOGIN
 * Gerencia a submissão do formulário.
 */

// Capturar elementos do DOM (certifique-se de que esses IDs estão no seu HTML)
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');

// Adicionar o "ouvinte" de evento para quando o formulário for enviado
loginForm.addEventListener('submit', function(event) {
    // 1. Impedir o recarregamento da página
    event.preventDefault();

    // 2. Coletar os valores digitados
    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    // 3. Procurar o usuário no array (usersData) que corresponde às credenciais
    const userFound = usersData.find(user => 
        user.username === enteredUsername && user.password === enteredPassword
    );

        if (userFound) {
        alert(`Login efetuado com sucesso! Bem-vindo(a), ${userFound.username}!`);

        // Redirecionamento
        if (userFound.isAdmin) {
            window.location.href = 'Home.html';
        } else {
            window.location.href = 'Home.html';
        }

        // --- SALVAR NA SESSÃO ---
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('isAdmin', userFound.isAdmin);
        sessionStorage.setItem('currentUser', userFound.username);

        // --- SALVAR NO LOCAL STORAGE (PERMANENTE) ---
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAdmin', userFound.isAdmin);
        localStorage.setItem('currentUser', userFound.username);

    } else {
        alert("Usuário ou Senha incorretos. Tente novamente.");
        usernameInput.value = '';
        passwordInput.value = '';
        usernameInput.focus();
    }

});
