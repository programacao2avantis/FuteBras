/* =====================================================================
   FuteBras - Jogador.jsx
   Detalhes e edição de um jogador.

   Como funciona a edição:
   - "jogador" é o jogador de verdade, dentro do estado do jogo.
   - "rascunho" é uma CÓPIA que os controles alteram.
   - A tela mostra o rascunho em tempo real (overall, impacto no clube...).
   - Só ao clicar em "Salvar alterações" o rascunho vai para o estado.

   /jogador/12  -> abre o jogador de id 12
   /jogador     -> abre o primeiro do elenco
   ===================================================================== */

import { useEffect, useState } from "react";
import { Link, useBlocker, useNavigate, useParams } from "react-router-dom";
import { useJogo } from "../../contexto/JogoContext";
import { DADOS } from "../../dados/dados";
import { buscarJogador, overallNaPosicao, overallDoClube } from "../../jogo/motor";
import { POSICOES, NOMES_HABILIDADES, DESCRICAO_PERKS } from "../../jogo/regras";
import { dinheiro } from "../../jogo/utilitarios";
import Perk from "../../componentes/Perk";
import "./Jogador.css";

// Campos que a tela permite editar (jogos e gols NÃO entram: são da temporada)
const CAMPOS_EDITAVEIS = ["nome", "posicao", "perk", "idade", "salario", "hab"];

function copiarCampos(origem) {
    const copia = { id: origem.id, jogos: origem.jogos, gols: origem.gols };
    CAMPOS_EDITAVEIS.forEach(c => copia[c] = c === "hab" ? { ...origem.hab } : origem[c]);
    return copia;
}

function iguais(a, b) {
    return JSON.stringify(copiarCampos(a)) === JSON.stringify(copiarCampos(b));
}

// Retorna a mensagem de erro, ou "" se estiver tudo certo
function validar(r) {
    if (!r.nome.trim()) return "Informe o nome do jogador.";
    if (!(r.idade >= 15 && r.idade <= 45)) return "A idade precisa estar entre 15 e 45.";
    if (!(r.salario >= 0)) return "O salário não pode ser negativo.";
    return "";
}

function folhaSalarial(lista) {
    let total = 0;
    lista.forEach(j => total += j.salario || 0);
    return total;
}


export default function Jogador() {
    const { estado } = useJogo();
    const { id } = useParams();
    const jogador = buscarJogador(estado, Number(id)) || estado.jogadores[0];
    // A "key" recria o editor (e o rascunho) quando troca de jogador
    return <EditorJogador key={jogador.id} jogador={jogador} />;
}


function EditorJogador({ jogador }) {
    const { estado, alterar } = useJogo();
    const navegar = useNavigate();
    const [rascunho, setRascunho] = useState(() => copiarCampos(jogador));
    const [salvou, setSalvou] = useState(false);

    const alterado = !iguais(jogador, rascunho);
    const erro = validar(rascunho);

    // Pergunta antes de sair da tela (ou trocar de jogador) com alterações pendentes
    const bloqueio = useBlocker(({ currentLocation, nextLocation }) =>
        alterado && currentLocation.pathname !== nextLocation.pathname);

    useEffect(() => {
        if (bloqueio.state !== "blocked") return;
        if (confirm("Há alterações não salvas neste jogador. Descartar?")) bloqueio.proceed();
        else bloqueio.reset();
    }, [bloqueio]);

    // Aviso do navegador ao fechar a aba ou dar F5 com alterações pendentes
    useEffect(() => {
        if (!alterado) return;
        const avisar = evento => { evento.preventDefault(); evento.returnValue = ""; };
        window.addEventListener("beforeunload", avisar);
        return () => window.removeEventListener("beforeunload", avisar);
    }, [alterado]);


    /* ---------- trocar de jogador ---------- */

    function abrir(id) {
        navegar("/jogador/" + id);
    }

    // -1 = anterior, +1 = próximo (dá a volta no fim da lista)
    function irPara(passo) {
        const lista = estado.jogadores;
        const i = lista.findIndex(j => j.id === jogador.id);
        abrir(lista[(i + passo + lista.length) % lista.length].id);
    }


    /* ---------- edição ---------- */

    function mudarCampo(campo, valor) {
        setSalvou(false);
        setRascunho(r => ({ ...r, [campo]: valor }));
    }

    function mudarHabilidade(hab, valor) {
        setSalvou(false);
        setRascunho(r => ({ ...r, hab: { ...r.hab, [hab]: valor } }));
    }

    function salvarJogador() {
        if (erro) return;
        alterar(e => {
            const alvo = buscarJogador(e, jogador.id);
            CAMPOS_EDITAVEIS.forEach(c => alvo[c] = c === "hab" ? { ...rascunho.hab } : rascunho[c]);
            alvo.nome = alvo.nome.trim();
        });
        setRascunho(r => ({ ...r, nome: r.nome.trim() }));
        setSalvou(true);
    }

    function descartarAlteracoes() {
        setRascunho(copiarCampos(jogador));
    }

    // Copia para o rascunho os valores do mock (dados.js). Ainda precisa salvar.
    function restaurarOriginal() {
        const original = DADOS.jogadores.find(j => j.id === jogador.id);
        if (!original) return;
        setSalvou(false);
        setRascunho(r => {
            const novo = { ...r };
            CAMPOS_EDITAVEIS.forEach(c => novo[c] = c === "hab" ? { ...original.hab } : original[c]);
            return novo;
        });
    }


    /* ---------- prévia ao vivo ---------- */

    const r = rascunho;
    const titular = estado.titulares.includes(jogador.id);

    // Overall do clube como se o rascunho já estivesse salvo
    const antes = overallDoClube(estado);
    const depois = overallDoClube({
        ...estado,
        jogadores: estado.jogadores.map(j => (j.id === jogador.id ? r : j))
    });

    const folhaAntes = folhaSalarial(estado.jogadores);
    const folhaDepois = folhaAntes - jogador.salario + (r.salario || 0);

    // Overall em cada posição (destaca a melhor)
    const valores = POSICOES.map(p => overallNaPosicao(r, p));
    const melhor = Math.max(...valores);

    let status = { texto: "Nenhuma alteração", classe: "sutil" };
    if (salvou && !alterado) status = { texto: "✅ Alterações salvas", classe: "dinheiro" };
    if (alterado) status = { texto: "Alterações não salvas", classe: "aviso" };
    if (erro) status = { texto: erro, classe: "erro" };

    return (
        <section>
            <h2>👤 Detalhes do jogador</h2>

            {/* Troca de jogador sem voltar ao painel */}
            <div className="barra-jogadores">
                <button className="botao-pequeno" onClick={() => irPara(-1)} aria-label="Jogador anterior">◀</button>
                <select aria-label="Escolher jogador" value={jogador.id} onChange={e => abrir(Number(e.target.value))}>
                    {estado.jogadores.map(j => (
                        <option key={j.id} value={j.id}>{j.nome} ({j.posicao})</option>
                    ))}
                </select>
                <button className="botao-pequeno" onClick={() => irPara(1)} aria-label="Próximo jogador">▶</button>
            </div>

            <div className="grade detalhes-jogador">

                {/* Coluna 1: cartão (prévia ao vivo) + informações editáveis */}
                <div className="coluna">
                    <div className="card centro">
                        <div className="avatar">👤</div>
                        <h2>{r.nome || "(sem nome)"}</h2>
                        <p className="sutil">{r.posicao} • {r.idade || "?"} anos</p>
                        <div className="overall-grande">{overallNaPosicao(r, r.posicao)}</div>
                        <p><Perk perk={r.perk} /></p>
                        <p className="sutil">{titular ? "Titular" : "Reserva"}</p>
                    </div>

                    <div className="card">
                        <h2>📄 Informações</h2>

                        <label htmlFor="campo-nome">Nome</label>
                        <input id="campo-nome" type="text" maxLength="20" value={r.nome}
                               onChange={e => mudarCampo("nome", e.target.value)} />

                        <label htmlFor="campo-posicao">Posição</label>
                        <select id="campo-posicao" value={r.posicao} onChange={e => mudarCampo("posicao", e.target.value)}>
                            {POSICOES.map(p => <option key={p}>{p}</option>)}
                        </select>

                        <label htmlFor="campo-perk">Perk</label>
                        <select id="campo-perk" value={r.perk} onChange={e => mudarCampo("perk", e.target.value)}>
                            <option value="">Sem perk</option>
                            {Object.keys(DESCRICAO_PERKS).map(p => (
                                <option key={p} value={p}>{p} — {DESCRICAO_PERKS[p]}</option>
                            ))}
                        </select>

                        <label htmlFor="campo-idade">Idade</label>
                        <input id="campo-idade" type="number" min="15" max="45" value={r.idade}
                               onChange={e => mudarCampo("idade", Number(e.target.value))} />

                        <label htmlFor="campo-salario">Salário por rodada (R$)</label>
                        <input id="campo-salario" type="number" min="0" step="500" value={r.salario}
                               onChange={e => mudarCampo("salario", Number(e.target.value))} />

                        <p className="linha"><span>Jogos na temporada</span><b>{jogador.jogos}</b></p>
                        <p className="linha"><span>Gols na temporada</span><b>{jogador.gols}</b></p>
                    </div>
                </div>

                {/* Coluna 2: habilidades com controles deslizantes */}
                <div className="card">
                    <h2>📊 Habilidades (1 a 10)</h2>
                    {Object.keys(NOMES_HABILIDADES).map(h => {
                        const dif = r.hab[h] - jogador.hab[h];
                        return (
                            <div className="hab-controle" key={h}>
                                <label htmlFor={"hab-" + h}>
                                    <span>{NOMES_HABILIDADES[h]}</span>
                                    <span>
                                        <small className={"delta " + (dif > 0 ? "mais" : dif < 0 ? "menos" : "")}>
                                            {dif === 0 ? "" : (dif > 0 ? "+" : "") + dif}
                                        </small>{" "}
                                        <b>{r.hab[h]}</b>
                                    </span>
                                </label>
                                <input id={"hab-" + h} type="range" min="1" max="10" step="1" value={r.hab[h]}
                                       onChange={e => mudarHabilidade(h, Number(e.target.value))} />
                            </div>
                        );
                    })}
                </div>

                {/* Coluna 3: impacto + ações */}
                <div className="coluna">
                    <div className="card">
                        <h2>🔁 Overall por posição</h2>
                        <p className="sutil">Cada posição usa habilidades diferentes</p>
                        {POSICOES.map((p, i) => (
                            <p className={"linha " + (valores[i] === melhor ? "melhor" : "")} key={p}>
                                <span>{p}{p === r.posicao && <small className="sutil"> (posição atual)</small>}</span>
                                <b>{valores[i]}</b>
                            </p>
                        ))}
                        <p className="linha total"><span>Overall do clube</span>
                            <b>{antes === depois ? antes : antes + " → " + depois}</b></p>
                        <p className="linha"><span>Folha salarial por rodada</span>
                            <b>{folhaAntes === folhaDepois
                                ? dinheiro(folhaAntes)
                                : dinheiro(folhaAntes) + " → " + dinheiro(folhaDepois)}</b></p>
                    </div>

                    <div className="card">
                        <h2>💾 Ajustes</h2>
                        <p className={status.classe} role="status">{status.texto}</p>
                        <button className="botao-amarelo" onClick={salvarJogador} disabled={!alterado || !!erro}>
                            Salvar alterações
                        </button>
                        <button className="botao-cinza" onClick={descartarAlteracoes} disabled={!alterado}>
                            Descartar alterações
                        </button>
                        <button className="botao-cinza" onClick={restaurarOriginal}>Voltar aos valores originais</button>
                    </div>

                    <Link className="botao-verde" to="/escalacao">Ir para a escalação</Link>
                    <Link className="botao-cinza" to="/">Voltar ao painel</Link>
                </div>
            </div>
        </section>
    );
}
