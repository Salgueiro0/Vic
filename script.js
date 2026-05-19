// Configuração do Supabase
const supabaseUrl = 'https://byujwlsvmahgyyjcssne.supabase.co';
const supabaseKey = 'sb_publishable_wkXJxy14f7R5M5VOHLl5hg_-eSL3Ecg';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

function checkLogin() {
    const user = document.getElementById('username').value.toLowerCase();
    const pass = document.getElementById('password').value;

    // Seus dados de acesso
    if (user === "sapecuda" && pass === "candiru") { 
        window.location.href = "home.html"; 
    } else {
        alert("Quase! Tenta de novo, vida. 💕");
    }
}

let hintCount = 0;
function showHint() {
    const hintElement = document.getElementById('hint-text');
    const hints = [
        "Dica 1: É aquele apelido bobo que a gente usa...",
        "Dica 2: A senha é aquele peixe que você não gosta (ou gosta? kkk).",
        "Dica 3: Login: sapecuda | Senha: candiru (Ta muito fácil!)"
    ];

    if (hintCount < hints.length) {
        hintElement.innerText = hints[hintCount];
        hintElement.classList.remove('hidden');
        hintCount++;
    }
}