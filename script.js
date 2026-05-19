function checkLogin() {
    const user = document.getElementById('username').value.toLowerCase();
    const pass = document.getElementById('password').value;

    // Defina aqui o login e a senha desejados
    if (user === "sapecuda" && pass === "candiru") { 
        window.location.href = "home.html"; // Nome da página que abrirá depois
    } else {
        alert("Ops! Tente novamente, meu bem. 💕");
    }
}

let hintCount = 0;
function showHint() {
    const hintElement = document.getElementById('hint-text');
    const hints = [
        "Dica 1: É como eu te chamo todos os dias...",
        "Dica 2: Que animal você é?",
        "Dica 3: Sério? Tá muito fácil! O login você sabe sap... e a senha outra dica - você não é um Guaiamu"
    ];

    if (hintCount < hints.length) {
        hintElement.innerText = hints[hintCount];
        hintElement.classList.remove('hidden');
        hintCount++;
    }
}