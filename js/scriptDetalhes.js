window.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const isAdmin = sessionStorage.getItem("isAdmin") === "true"; 

    // Seleciona o botão pela classe
    const achadoButton = document.querySelector(".btn-registrar");

    if (!achadoButton) {
        console.warn("Botão 'Achado' não encontrado no DOM.");
        return; // evita erros
    }

    // Caso não esteja logado → opcional redirecionar
    if (!isLoggedIn) {
        console.warn("Usuário não está logado!");
        // window.location.href = "login.html";
    }

    // SE FOR ALUNO → esconde o botão
    if (!isAdmin) {
        achadoButton.style.display = "none";
    }

    // SE FOR SECRETARIA → mantém visível
});
