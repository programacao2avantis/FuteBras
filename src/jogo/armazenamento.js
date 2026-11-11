/* =====================================================================
   FuteBras - armazenamento.js
   Leitura e gravação no localStorage (estado do jogo e login).
   No React a tela não recarrega ao trocar de rota, mas o localStorage
   continua sendo usado para o progresso sobreviver ao F5 e ao fechar a aba.
   ===================================================================== */

const CHAVE_ESTADO = "futebras-estado";
const CHAVE_LOGIN = "futebras-logado";

export function salvarEstado(estado) {
    try {
        localStorage.setItem(CHAVE_ESTADO, JSON.stringify(estado));
    } catch (erro) {
        console.warn("Não foi possível salvar o jogo:", erro);
    }
}

export function carregarEstado() {
    try {
        const texto = localStorage.getItem(CHAVE_ESTADO);
        return texto ? JSON.parse(texto) : null;
    } catch (erro) {
        return null;
    }
}

export function estaLogado() {
    try { return localStorage.getItem(CHAVE_LOGIN) === "sim"; }
    catch (erro) { return false; }
}

export function registrarLogin() {
    try { localStorage.setItem(CHAVE_LOGIN, "sim"); } catch (erro) { /* segue sem lembrar */ }
}

export function apagarLogin() {
    try { localStorage.removeItem(CHAVE_LOGIN); } catch (erro) { /* nada a fazer */ }
}
