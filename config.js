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


// =========================================================================
// 🎵 G: TRILHA SONORA COM PLAY, PAUSE, CONTROLE DE VOLUME E PERSISTÊNCIA 🎵
// =========================================================================
/*
   COMO USAR QUALQUER MÚSICA ESPECÍFICA:
   1. Você pode hospedar qualquer arquivo .mp3 gratuitamente no seu Supabase Storage!
      - Vá no painel do Supabase -> Storage.
      - Entre no seu bucket 'imagens' (ou crie um novo chamado 'musicas' público).
      - Faça o upload da sua música em formato .mp3.
      - Copie a URL pública gerada para a música.
   2. Cole essa URL pública abaixo dentro das aspas simples na variável MUSIC_URL:
*/
const MUSIC_URL = 'https://byujwlsvmahgyyjcssne.supabase.co/storage/v1/object/public/imagens/tarjamitrovic-passionate-romance-444412.mp3'; 

function inicializarMusica() {
    // Evita duplicar se já existir o player
    if (document.getElementById('music-player-container')) return;

    // 1. Cria o elemento de áudio
    const audio = document.createElement('audio');
    audio.id = 'bg-music';
    audio.src = MUSIC_URL;
    audio.loop = true;
    
    // Recupera o volume salvo anteriormente (padrão 0.3)
    const volumeSalvo = parseFloat(localStorage.getItem('music_volume') || '0.3');
    audio.volume = volumeSalvo;
    document.body.appendChild(audio);

    // 2. Cria o Container do Player Flutuante
    const playerContainer = document.createElement('div');
    playerContainer.id = 'music-player-container';
    playerContainer.style.position = 'fixed';
    playerContainer.style.bottom = '20px';
    playerContainer.style.right = '20px';
    playerContainer.style.zIndex = '9999';
    playerContainer.style.display = 'flex';
    playerContainer.style.alignItems = 'center';
    playerContainer.style.backgroundColor = 'white';
    playerContainer.style.border = '2px solid #ffb6c1';
    playerContainer.style.borderRadius = '30px';
    playerContainer.style.padding = '6px 12px';
    playerContainer.style.boxShadow = '0 6px 16px rgba(255, 105, 180, 0.2)';
    playerContainer.style.transition = 'all 0.3s ease';
    playerContainer.style.gap = '8px';
    playerContainer.style.fontFamily = 'sans-serif';
    document.body.appendChild(playerContainer);

    // 3. Cria o Botão Principal de Ícone / CD Giratório
    const diskBtn = document.createElement('button');
    diskBtn.id = 'music-disk-btn';
    diskBtn.innerHTML = '💿';
    diskBtn.title = 'Configurações de Áudio';
    diskBtn.style.background = 'none';
    diskBtn.style.border = 'none';
    diskBtn.style.fontSize = '22px';
    diskBtn.style.cursor = 'pointer';
    diskBtn.style.display = 'flex';
    diskBtn.style.alignItems = 'center';
    diskBtn.style.justifyContent = 'center';
    diskBtn.style.padding = '0';
    diskBtn.style.transition = 'transform 0.3s';
    playerContainer.appendChild(diskBtn);

    // 4. Cria o Botão de Play/Pause
    const playPauseBtn = document.createElement('button');
    playPauseBtn.id = 'music-play-pause-btn';
    playPauseBtn.innerHTML = '▶️'; // Começa com Play
    playPauseBtn.style.background = '#ff69b4';
    playPauseBtn.style.border = 'none';
    playPauseBtn.style.color = 'white';
    playPauseBtn.style.borderRadius = '50%';
    playPauseBtn.style.width = '28px';
    playPauseBtn.style.height = '28px';
    playPauseBtn.style.fontSize = '12px';
    playPauseBtn.style.cursor = 'pointer';
    playPauseBtn.style.display = 'flex';
    playPauseBtn.style.alignItems = 'center';
    playPauseBtn.style.justifyContent = 'center';
    playPauseBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    playPauseBtn.style.transition = 'background-color 0.2s, transform 0.2s';
    playerContainer.appendChild(playPauseBtn);

    // 5. Cria o Ícone de Alto-Falante para Volume
    const volIcon = document.createElement('span');
    volIcon.id = 'music-volume-icon';
    volIcon.innerHTML = volumeSalvo === 0 ? '🔇' : volumeSalvo < 0.5 ? '🔉' : '🔊';
    volIcon.style.fontSize = '16px';
    volIcon.style.cursor = 'default';
    playerContainer.appendChild(volIcon);

    // 6. Cria o Slider de Volume (Altura da Música)
    const volSlider = document.createElement('input');
    volSlider.type = 'range';
    volSlider.min = '0';
    volSlider.max = '1';
    volSlider.step = '0.05';
    volSlider.value = volumeSalvo;
    volSlider.style.width = '70px';
    volSlider.style.cursor = 'pointer';
    volSlider.style.accentColor = '#ff69b4'; // Rosa lindo para combinar
    volSlider.style.margin = '0';
    playerContainer.appendChild(volSlider);

    // Adiciona estilos de animação de rotação do CD
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes rodarCd {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .cd-rodando {
            animation: rodarCd 3s linear infinite;
        }
        #music-disk-btn:hover {
            transform: scale(1.15);
        }
        #music-play-pause-btn:hover {
            background-color: #ff1493;
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);

    // Recupera o estado de reprodução anterior (se estava tocando)
    const tocandoAnteriormente = localStorage.getItem('music_playing') === 'true';
    const tempoAnterior = parseFloat(localStorage.getItem('music_time') || '0');

    audio.currentTime = tempoAnterior;

    // Atualiza o estado visual do botão e do CD
    function atualizarEstadoVisual(isExecuting) {
        if (isExecuting) {
            playPauseBtn.innerHTML = '⏸️'; // Símbolo de Pause
            diskBtn.classList.add('cd-rodando');
        } else {
            playPauseBtn.innerHTML = '▶️'; // Símbolo de Play
            diskBtn.classList.remove('cd-rodando');
        }
    }

    // Função de Alternar Play/Pause
    function alternarMusica() {
        if (audio.paused) {
            audio.play().then(() => {
                atualizarEstadoVisual(true);
                localStorage.setItem('music_playing', 'true');
            }).catch(err => console.log("Autoplay bloqueado pelo navegador, aguardando clique de interação."));
        } else {
            audio.pause();
            atualizarEstadoVisual(false);
            localStorage.setItem('music_playing', 'false');
        }
    }

    // Escuta cliques no botão de Play/Pause e no próprio disquinho (CD)
    playPauseBtn.addEventListener('click', alternarMusica);
    diskBtn.addEventListener('click', alternarMusica);

    // Escuta mudança de volume
    volSlider.addEventListener('input', (e) => {
        const novoVol = parseFloat(e.target.value);
        audio.volume = novoVol;
        localStorage.setItem('music_volume', novoVol);
        
        // Atualiza ícone de volume de acordo com a intensidade
        if (novoVol === 0) {
            volIcon.innerHTML = '🔇';
        } else if (novoVol < 0.5) {
            volIcon.innerHTML = '🔉';
        } else {
            volIcon.innerHTML = '🔊';
        }
    });

    // Se estava tocando antes, tenta reproduzir automaticamente ao carregar
    if (tocandoAnteriormente) {
        audio.play().then(() => {
            atualizarEstadoVisual(true);
        }).catch(() => {
            // Se o navegador bloquear autoplay, aguarda o primeiro clique na tela para tocar
            const tocarNoPrimeiroClique = () => {
                audio.play().then(() => {
                    atualizarEstadoVisual(true);
                    document.removeEventListener('click', tocarNoPrimeiroClique);
                });
            };
            document.addEventListener('click', tocarNoPrimeiroClique);
        });
    }

    // Salva o progresso atual da música a cada 1 segundo para persistir ao mudar de página
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem('music_time', audio.currentTime);
        }
    }, 1000);
}

// Inicializa o player completo após o DOM estar pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarMusica);
} else {
    inicializarMusica();
}
