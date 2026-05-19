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
        "Dica 1: login: o que você?",
        "Dica 2: senha: quem é você",
        "Dica 3: esta bemmm de boas kkkk, né sap... e você não é um Guaiamu"
    ];

    if (hintCount < hints.length) {
        hintElement.innerText = hints[hintCount];
        hintElement.classList.remove('hidden');
        hintCount++;
    }
}