/* =====================================================================
   FuteBras - simulacao.js
   Simulação da rodada e efeitos pós-jogo (antes: seções 1, 2 e 3 do partida.js).
   Todas as funções recebem o estado e ALTERAM o estado recebido.
   O JogoContext entrega uma cópia, então isso é seguro.
   ===================================================================== */

import { PREMIO_FINAL } from "./regras";
import { buscarJogador, calcularSetores, vagasDaFormacao, classificacao } from "./motor";
import { limitar, somar, sortear } from "./utilitarios";


/* ===================== MONTAGEM DOS TIMES ===================== */

// Monta o "time" no formato que a simulação usa
function montarMeuTime(estado) {
    const vagas = vagasDaFormacao(estado.tatica.formacao);
    const autores = [];   // quem pode marcar gol (atacante aparece mais vezes = mais chance)
    vagas.forEach((posicao, i) => {
        const j = buscarJogador(estado, estado.titulares[i]);
        if (posicao === "ATA") autores.push(j, j, j);
        if (posicao === "MEI") autores.push(j, j);
        if (posicao === "ZAG") autores.push(j);
    });
    const goleiro = buscarJogador(estado, estado.titulares[0]);
    return {
        nome: estado.clube.nome,
        setores: calcularSetores(estado),
        autores: autores,
        pegadorPenalti: goleiro.perk === "Pegador de pênalti"
    };
}

// Times da IA: o overall vale para os três setores
function montarAdversario(estado, nome) {
    const adv = estado.adversarios.find(a => a.nome === nome);
    return {
        nome: adv.nome,
        setores: { ataque: adv.overall, meio: adv.overall, defesa: adv.overall },
        autores: adv.artilheiros.map(n => ({ nome: n })),
        pegadorPenalti: false
    };
}


/* ===================== SIMULAÇÃO DA PARTIDA ===================== */

// Partida em 6 blocos de 15 minutos (pitch, slide 10)
// - intensidade define quantos lances por bloco
// - o meio-campo decide quem ataca no lance
// - ataque x defesa decide se o lance vira gol
function simularJogo(casa, fora, intensidade) {
    const lancesPorBloco = 1 + Math.round(intensidade / 50);   // 1, 2 ou 3
    const gols = [];

    for (let bloco = 0; bloco < 6; bloco++) {
        for (let lance = 0; lance < lancesPorBloco; lance++) {

            // Mandante ganha +2 no meio (fator casa)
            const diferencaMeio = (casa.setores.meio + 2) - fora.setores.meio;
            const chanceCasaAtacar = limitar(0.5 + diferencaMeio / 100, 0.2, 0.8);
            const casaAtaca = Math.random() < chanceCasaAtacar;

            const atacante = casaAtaca ? casa : fora;
            const defensor = casaAtaca ? fora : casa;

            // 22% de base + 1% por ponto de diferença entre ataque e defesa
            let chanceGol = 0.22 + (atacante.setores.ataque - defensor.setores.defesa) / 100;
            if (defensor.pegadorPenalti) chanceGol -= 0.03;
            chanceGol = limitar(chanceGol, 0.05, 0.6);

            if (Math.random() < chanceGol) {
                gols.push({
                    minuto: bloco * 15 + 1 + Math.floor(Math.random() * 15),
                    time: atacante.nome,
                    autor: sortear(atacante.autores)
                });
            }
        }
    }

    gols.sort((a, b) => a.minuto - b.minuto);
    return {
        casa: casa.nome,
        fora: fora.nome,
        golsCasa: gols.filter(g => g.time === casa.nome).length,
        golsFora: gols.filter(g => g.time === fora.nome).length,
        gols: gols
    };
}

// Simula a rodada inteira, aplica os efeitos e devolve o resultado do meu jogo
export function jogarRodada(estado) {
    const meuNome = estado.clube.nome;
    let meuJogo = null;

    // Simula TODOS os jogos da rodada (os da IA usam a mesma função)
    estado.calendario[estado.rodada].forEach(([nomeCasa, nomeFora]) => {
        const casa = nomeCasa === meuNome ? montarMeuTime(estado) : montarAdversario(estado, nomeCasa);
        const fora = nomeFora === meuNome ? montarMeuTime(estado) : montarAdversario(estado, nomeFora);
        const ehMeuJogo = nomeCasa === meuNome || nomeFora === meuNome;
        const intensidade = ehMeuJogo ? estado.tatica.intensidade : 50;

        const resultado = simularJogo(casa, fora, intensidade);
        atualizarTabela(estado, resultado);
        if (ehMeuJogo) meuJogo = resultado;
    });

    const efeitos = aplicarEfeitos(estado, meuJogo);
    estado.rodada++;

    // Guarda uma versão "leve" do resultado: no lugar do objeto do jogador,
    // só o nome do autor do gol. Assim dá para reabrir depois (?ultimo=1).
    estado.ultimoResultado = {
        rodada: estado.rodada,
        jogo: {
            casa: meuJogo.casa, fora: meuJogo.fora,
            golsCasa: meuJogo.golsCasa, golsFora: meuJogo.golsFora,
            gols: meuJogo.gols.map(g => ({ minuto: g.minuto, time: g.time, autor: g.autor.nome }))
        },
        efeitos: efeitos
    };
    return estado.ultimoResultado;
}


/* ===================== EFEITOS DA RODADA ===================== */

function atualizarTabela(estado, r) {
    const casa = estado.tabela[r.casa];
    const fora = estado.tabela[r.fora];
    casa.j++; fora.j++;
    casa.gp += r.golsCasa; casa.gc += r.golsFora;
    fora.gp += r.golsFora; fora.gc += r.golsCasa;

    if (r.golsCasa > r.golsFora)      { casa.v++; casa.pts += 3; fora.d++; }
    else if (r.golsCasa < r.golsFora) { fora.v++; fora.pts += 3; casa.d++; }
    else                              { casa.e++; fora.e++; casa.pts++; fora.pts++; }
}

// Tudo que acontece com o clube depois do jogo
function aplicarEfeitos(estado, jogo) {
    const clube = estado.clube;
    const souMandante = jogo.casa === clube.nome;
    const meusGols = souMandante ? jogo.golsCasa : jogo.golsFora;
    const golsAdv = souMandante ? jogo.golsFora : jogo.golsCasa;

    let situacao = "empate";
    if (meusGols > golsAdv) situacao = "vitoria";
    if (meusGols < golsAdv) situacao = "derrota";

    const efeitos = {
        situacao,
        moralAntes: clube.moral,
        entrosamentoAntes: clube.entrosamento,
        receitas: [],
        despesas: [],
        treino: [],
        treinoHabilidade: estado.tatica.treino,
        avisos: []
    };

    // --- Moral (pitch, slide 9) ---
    if (situacao === "vitoria") clube.moral += 8;
    if (situacao === "empate") clube.moral -= 1;
    if (situacao === "derrota") clube.moral -= estado.tecnico.perks.includes("Paizão") ? 4 : 8;

    // Marrento no banco fica irritado
    estado.jogadores.forEach(j => {
        if (j.perk === "Marrento" && !estado.titulares.includes(j.id)) {
            clube.moral -= 2;
            efeitos.avisos.push(j.nome + " (Marrento) reclamou de ficar no banco: moral -2");
        }
    });

    // --- Reputação do técnico ---
    if (situacao === "vitoria") estado.tecnico.reputacao += 1;
    if (situacao === "derrota") estado.tecnico.reputacao -= 1;

    // --- Entrosamento: sobe jogando com o mesmo time ---
    const trocas = estado.titulares.filter(id => !estado.ultimosTitulares.includes(id)).length;
    if (estado.ultimosTitulares.length > 0 && trocas > 2) {
        clube.entrosamento -= 4;
        efeitos.avisos.push(trocas + " titulares trocados: entrosamento -4");
    } else {
        clube.entrosamento += 2;
    }
    estado.ultimosTitulares = estado.titulares.slice();

    // --- Estatísticas dos jogadores ---
    estado.titulares.forEach(id => buscarJogador(estado, id).jogos++);
    jogo.gols.forEach(g => { if (g.autor.id) g.autor.gols++; });

    // --- Finanças (pitch, slide 5) ---
    if (souMandante) {
        const publico = Math.min(clube.estadio, Math.round(clube.torcedores * (0.5 + clube.moral / 100)));
        efeitos.receitas.push(["Ingressos (" + publico.toLocaleString("pt-BR") + " pagantes)", publico * clube.precoIngresso]);
    }
    efeitos.receitas.push(["Direitos de transmissão", 60000]);
    efeitos.receitas.push(["Patrocínio", clube.patrocinio / estado.calendario.length]);
    if (situacao === "vitoria") efeitos.receitas.push(["Premiação por vitória", 50000]);
    if (situacao === "empate") efeitos.receitas.push(["Premiação por empate", 20000]);

    let salarios = 0;
    estado.jogadores.forEach(j => salarios += j.salario);
    efeitos.despesas.push(["Salários", salarios]);
    efeitos.despesas.push(["Manutenção do estádio", 30000]);

    efeitos.saldo = somar(efeitos.receitas) - somar(efeitos.despesas);
    clube.caixa += efeitos.saldo;

    if (clube.caixa < 0) {
        clube.moral -= 5;
        efeitos.avisos.push("Caixa negativo: salários atrasados, moral -5");
    }

    // --- Treino (pitch, slide 8): 25% de chance de +1 na habilidade escolhida ---
    const hab = estado.tatica.treino;
    estado.titulares.forEach(id => {
        const j = buscarJogador(estado, id);
        if (j.hab[hab] < 10 && Math.random() < 0.25) {
            j.hab[hab]++;
            efeitos.treino.push(j.nome);
        }
    });

    // Mantém tudo entre 0 e 100
    clube.moral = limitar(clube.moral, 0, 100);
    clube.entrosamento = limitar(clube.entrosamento, 0, 100);
    estado.tecnico.reputacao = limitar(estado.tecnico.reputacao, 0, 100);

    efeitos.moralDepois = clube.moral;
    efeitos.entrosamentoDepois = clube.entrosamento;

    // --- Fim de temporada (pitch, slide 11) ---
    if (estado.rodada + 1 === estado.calendario.length) {
        const tabela = classificacao(estado);
        const posicao = tabela.findIndex(t => t.nome === clube.nome);
        clube.caixa += PREMIO_FINAL[posicao];
        efeitos.fimTemporada = { campeao: tabela[0].nome, posicao: posicao + 1, premio: PREMIO_FINAL[posicao] };
    }

    efeitos.caixaDepois = clube.caixa;
    return efeitos;
}
