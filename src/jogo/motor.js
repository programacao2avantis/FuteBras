/* =====================================================================
   FuteBras - motor.js
   Regras de cálculo, escalação e temporada (antes: seções 2, 3 e 4 do comum.js).

   DIFERENÇA PARA A VERSÃO HTML:
   Antes existia uma variável global "estado". Agora toda função recebe o
   estado como primeiro parâmetro. Quem guarda o estado é o JogoContext
   (src/contexto/JogoContext.jsx).
   ===================================================================== */

import { DADOS } from "../dados/dados";
import { HABILIDADES_DA_POSICAO, SETOR_DA_POSICAO, BONUS_ESTILO } from "./regras";


/* ===================== ESTADO NOVO ===================== */

export function criarEstadoNovo() {
    // Cópia dos dados: assim o DADOS original nunca é alterado
    // (a tela do jogador usa ele para "restaurar valores originais")
    const dados = JSON.parse(JSON.stringify(DADOS));

    // Calendário: o mock tem o turno (5 rodadas). O returno é o mesmo turno
    // com mandante e visitante invertidos.
    const turno = dados.calendario;
    const returno = turno.map(rodada => rodada.map(jogo => [jogo[1], jogo[0]]));

    const estado = {
        clube: dados.clube,
        tecnico: dados.tecnico,
        jogadores: dados.jogadores,
        adversarios: dados.adversarios,
        calendario: turno.concat(returno),
        rodada: 0,                 // índice da próxima rodada
        tabela: {},                // classificação
        titulares: [],             // ids dos jogadores, na ordem das vagas
        ultimosTitulares: [],      // usado no cálculo de entrosamento
        ultimoResultado: null,     // última partida jogada (para reabrir na tela de partida)
        tatica: {
            formacao: "4-3-3",
            estilo: "Posse de bola",
            marcacao: 50,
            intensidade: 50,
            treino: "finalizacao"
        }
    };

    iniciarTemporada(estado);
    escalarAutomatico(estado);
    return estado;
}


/* ===================== CÁLCULOS ===================== */

export function buscarJogador(estado, id) {
    return estado.jogadores.find(j => j.id === id);
}

// Overall = média das habilidades da posição x 10 (habilidade 1-10 vira 10-100)
export function overallNaPosicao(jogador, posicao) {
    const habilidades = HABILIDADES_DA_POSICAO[posicao];
    let soma = 0;
    habilidades.forEach(h => soma += jogador.hab[h]);
    return Math.round(soma / habilidades.length * 10);
}

// Overall do jogador na partida, já com o efeito do perk
export function overallEmCampo(jogador, posicao) {
    let ovr = overallNaPosicao(jogador, posicao);
    if (jogador.perk === "Casca-grossa") ovr += 3;
    if (jogador.perk === "Amarelão") ovr -= 3;
    if (jogador.perk === "Marrento") ovr += 2;
    return ovr;
}

// "4-3-3" vira ["GOL","ZAG","ZAG","ZAG","ZAG","MEI","MEI","MEI","ATA","ATA","ATA"]
export function vagasDaFormacao(formacao) {
    const [zag, mei, ata] = formacao.split("-").map(Number);
    return ["GOL"].concat(
        Array(zag).fill("ZAG"),
        Array(mei).fill("MEI"),
        Array(ata).fill("ATA")
    );
}

// Melhor jogador ainda não escalado para a posição.
// Se "soDaPosicao" for true, só aceita quem é daquela posição.
function melhorDisponivel(estado, posicao, soDaPosicao) {
    let melhor = null;
    estado.jogadores.forEach(j => {
        if (estado.titulares.includes(j.id)) return;
        if (soDaPosicao && j.posicao !== posicao) return;
        if (melhor === null || overallNaPosicao(j, posicao) > overallNaPosicao(melhor, posicao)) {
            melhor = j;
        }
    });
    return melhor;
}

// Escala o time em duas passadas:
// 1ª) cada vaga recebe o melhor jogador DA POSIÇÃO
// 2ª) vagas que sobraram vazias recebem o melhor que restou (fora de posição)
export function escalarAutomatico(estado) {
    const vagas = vagasDaFormacao(estado.tatica.formacao);
    estado.titulares = [];

    vagas.forEach((posicao, i) => {
        const j = melhorDisponivel(estado, posicao, true);
        estado.titulares[i] = j ? j.id : null;
    });

    vagas.forEach((posicao, i) => {
        if (estado.titulares[i] === null) estado.titulares[i] = melhorDisponivel(estado, posicao, false).id;
    });
}

// O CORAÇÃO DO JOGO (pitch, slide 6):
// cada setor = média dos jogadores + quantidade no setor + entrosamento + moral + tática
export function calcularSetores(estado) {
    const vagas = vagasDaFormacao(estado.tatica.formacao);
    const soma = { ataque: 0, meio: 0, defesa: 0 };
    const quantidade = { ataque: 0, meio: 0, defesa: 0 };

    vagas.forEach((posicao, i) => {
        const jogador = buscarJogador(estado, estado.titulares[i]);
        const setor = SETOR_DA_POSICAO[posicao];
        soma[setor] += overallEmCampo(jogador, posicao);
        quantidade[setor]++;
    });

    // Quantidade "padrão" de cada setor (4-3-3). Cada jogador a mais vale +2
    const padrao = { ataque: 3, meio: 3, defesa: 5 };
    const bonusGeral = (estado.clube.entrosamento - 50) / 10 + (estado.clube.moral - 50) / 10;
    const estilo = BONUS_ESTILO[estado.tatica.estilo];

    const setores = {};
    ["ataque", "meio", "defesa"].forEach(s => {
        setores[s] = soma[s] / quantidade[s]
                   + (quantidade[s] - padrao[s]) * 2
                   + bonusGeral
                   + estilo[s];
    });

    // Marcação alta protege a defesa, mas tira um pouco do ataque
    const marcacao = (estado.tatica.marcacao - 50) / 10;
    setores.defesa += marcacao;
    setores.ataque -= marcacao / 2;

    if (estado.tecnico.perks.includes("Copeiro")) setores.ataque += 2;

    setores.ataque = Math.round(setores.ataque);
    setores.meio = Math.round(setores.meio);
    setores.defesa = Math.round(setores.defesa);
    return setores;
}

export function overallDoClube(estado) {
    const s = calcularSetores(estado);
    return Math.round((s.ataque + s.meio + s.defesa) / 3);
}


/* ===================== TEMPORADA E CLASSIFICAÇÃO ===================== */

export function iniciarTemporada(estado) {
    estado.rodada = 0;
    estado.tabela = {};
    estado.ultimoResultado = null;
    const nomes = [estado.clube.nome].concat(estado.adversarios.map(a => a.nome));
    nomes.forEach(nome => {
        estado.tabela[nome] = { nome, pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0 };
    });
    estado.jogadores.forEach(j => { j.jogos = 0; j.gols = 0; });
}

// Ordena por pontos, depois saldo de gols, depois gols marcados
export function classificacao(estado) {
    return Object.values(estado.tabela).sort((a, b) =>
        b.pts - a.pts || (b.gp - b.gc) - (a.gp - a.gc) || b.gp - a.gp
    );
}

export function temporadaEncerrada(estado) {
    return estado.rodada >= estado.calendario.length;
}

// Jogo do meu time na próxima rodada: ["Casa", "Fora"]
export function proximoJogo(estado) {
    if (temporadaEncerrada(estado)) return null;
    return estado.calendario[estado.rodada].find(j => j.includes(estado.clube.nome));
}

export function escudo(estado, nome) {
    if (nome === estado.clube.nome) return estado.clube.escudo;
    return estado.adversarios.find(a => a.nome === nome).escudo;
}
