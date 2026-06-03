// Configuração Centralizada do Supabase e Segurança do App
const supabaseUrl = 'https://byujwlsvmahgyyjcssne.supabase.co';
const supabaseKey = 'sb_publishable_wkXJxy14f7R5M5VOHLl5hg_-eSL3Ecg';

// Inicializa o cliente do Supabase globalmente
if (typeof supabase !== 'undefined') {
    window._supabase = supabase.createClient(supabaseUrl, supabaseKey);
} else {
    console.error("Supabase SDK não foi carregado antes do config.js!");
}

// Proteção de Rotas (Sessão de Login)
function verificarSessao() {
    const logado = localStorage.getItem('vic_logado');
    const path = window.location.pathname;
    const paginasPrivadas = ['home.html', 'recados.html'];

    // Se o usuário está em uma página privada e não está logado, redireciona para o index
    const ehPaginaPrivada = paginasPrivadas.some(pagina => path.includes(pagina));
    
    if (ehPaginaPrivada && logado !== 'true') {
        alert("Acesso restrito! Por favor, faça login. 💕");
        window.location.href = "index.html";
    }
}

// Executa a verificação imediatamente ao carregar o script
verificarSessao();

// Função global de logout
function fazerLogout() {
    localStorage.removeItem('vic_logado');
    window.location.href = "index.html";
}

// --- G: Trilha Sonora com persistência entre páginas ---
const MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'; // Você pode trocar esta URL por qualquer MP3!

function inicializarMusica() {
    // Evita duplicar se já existir
    if (document.getElementById('bg-music')) return;

    // Cria o elemento de áudio
    const audio = document.createElement('audio');
    audio.id = 'bg-music';
    audio.src = MUSIC_URL;
    audio.loop = true;
    audio.volume = 0.3; // Volume agradável de fundo
    document.body.appendChild(audio);

    // Cria o botão flutuante
    const musicBtn = document.createElement('button');
    musicBtn.id = 'music-btn';
    musicBtn.innerHTML = '🎵';
    musicBtn.title = 'Música de Fundo';
    musicBtn.style.position = 'fixed';
    musicBtn.style.bottom = '20px';
    musicBtn.style.right = '20px';
    musicBtn.style.width = '45px';
    musicBtn.style.height = '45px';
    musicBtn.style.borderRadius = '50%';
    musicBtn.style.border = 'none';
    musicBtn.style.backgroundColor = '#ff69b4';
    musicBtn.style.color = 'white';
    musicBtn.style.fontSize = '20px';
    musicBtn.style.cursor = 'pointer';
    musicBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
    musicBtn.style.zIndex = '9999';
    musicBtn.style.transition = 'transform 0.3s, background-color 0.3s';
    musicBtn.style.display = 'flex';
    musicBtn.style.alignItems = 'center';
    musicBtn.style.justifyContent = 'center';
    document.body.appendChild(musicBtn);

    // Adiciona animação de rotação se tocando
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes rodar {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .rodando {
            animation: rodar 4s linear infinite;
            background-color: #ff1493 !important;
        }
        #music-btn:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);

    // Recupera estado anterior
    const tocandoAnteriormente = localStorage.getItem('music_playing') === 'true';
    const tempoAnterior = parseFloat(localStorage.getItem('music_time') || '0');

    audio.currentTime = tempoAnterior;

    function alternarMusica() {
        if (audio.paused) {
            audio.play().then(() => {
                musicBtn.classList.add('rodando');
                localStorage.setItem('music_playing', 'true');
            }).catch(err => console.log("Autoplay bloqueado pelo navegador, aguardando clique."));
        } else {
            audio.pause();
            musicBtn.classList.remove('rodando');
            localStorage.setItem('music_playing', 'false');
        }
    }

    musicBtn.addEventListener('click', alternarMusica);

    // Tenta reproduzir automaticamente caso o usuário já tenha interagido
    if (tocandoAnteriormente) {
        audio.play().then(() => {
            musicBtn.classList.add('rodando');
        }).catch(() => {
            // Se falhar (bloqueio do navegador), escuta o primeiro clique no body para dar play automático
            const tocarNoPrimeiroClique = () => {
                audio.play().then(() => {
                    musicBtn.classList.add('rodando');
                    document.removeEventListener('click', tocarNoPrimeiroClique);
                });
            };
            document.addEventListener('click', tocarNoPrimeiroClique);
        });
    }

    // Salva o progresso da música periodicamente
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem('music_time', audio.currentTime);
        }
    }, 1000);
}

// Inicializa a música após o DOM carregar totalmente
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarMusica);
} else {
    inicializarMusica();
}
