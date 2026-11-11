/* =====================================================================
   FuteBras - Escalacao.jsx
   Campo com as vagas, controles táticos, força dos setores e reservas.
   Toda mudança passa pelo alterar() do contexto, que já salva o jogo.
   ===================================================================== */

import { Link } from "react-router-dom";
import { useJogo } from "../../contexto/JogoContext";
import {
    vagasDaFormacao, buscarJogador, overallNaPosicao, overallEmCampo,
    calcularSetores, overallDoClube, escalarAutomatico
} from "../../jogo/motor";
import { FORMACOES, ESTILOS, NOMES_HABILIDADES } from "../../jogo/regras";
import { capitalizar, limitar } from "../../jogo/utilitarios";
import "./Escalacao.css";

export default function Escalacao() {
    const { estado, alterar } = useJogo();
    const { tatica } = estado;
    const vagas = vagasDaFormacao(tatica.formacao);
    const setores = calcularSetores(estado);
    const reservas = estado.jogadores.filter(j => !estado.titulares.includes(j.id));

    // Coloca o jogador na vaga. Se ele já estava em outra vaga, os dois trocam de lugar
    function trocarJogador(vaga, novoId) {
        alterar(e => {
            const antigoId = e.titulares[vaga];
            const outraVaga = e.titulares.indexOf(novoId);
            if (outraVaga !== -1) e.titulares[outraVaga] = antigoId;
            e.titulares[vaga] = novoId;
        });
    }

    function mudarFormacao(formacao) {
        alterar(e => {
            e.tatica.formacao = formacao;
            escalarAutomatico(e);
        });
    }

    function mudarTatica(campo, valor) {
        alterar(e => { e.tatica[campo] = valor; });
    }

    function escalarMelhorTime() {
        alterar(e => escalarAutomatico(e));
    }

    // Uma vaga do campo (índice i na lista de titulares)
    function vaga(posicao, i) {
        const atual = buscarJogador(estado, estado.titulares[i]);
        const fora = atual.posicao !== posicao ? "fora-posicao" : "";
        return (
            <div className={"vaga " + fora} key={i}>
                <span className="posicao">{posicao} • {overallEmCampo(atual, posicao)}</span>
                <select aria-label={`Vaga ${i + 1} (${posicao})`} value={atual.id}
                        onChange={e => trocarJogador(i, Number(e.target.value))}>
                    {estado.jogadores.map(j => (
                        <option key={j.id} value={j.id}>
                            {j.nome} ({j.posicao}) {overallNaPosicao(j, posicao)}
                        </option>
                    ))}
                </select>
                <Link className="ver-jogador" to={"/jogador/" + atual.id}>ver jogador</Link>
            </div>
        );
    }

    return (
        <section>
            <h2>📋 Escalação e tática</h2>
            <p className="sutil">Escolha quem joga em cada vaga. Jogador fora da posição perde overall. As mudanças são salvas na hora.</p>

            <div className="grade">
                <div className="card">
                    <h2>⚽ Time titular</h2>
                    {/* Uma linha por setor, do ataque (em cima) até o goleiro (embaixo) */}
                    <div className="campo">
                        {["ATA", "MEI", "ZAG", "GOL"].map(pos => (
                            <div className="linha-campo" key={pos}>
                                {vagas.map((posVaga, i) =>
                                    posVaga === pos ? vaga(pos, i) : null
                                )}
                            </div>
                        ))}
                    </div>
                    <button className="botao-verde" onClick={escalarMelhorTime}>
                        Escalar o melhor time automaticamente
                    </button>
                </div>

                <div className="coluna">
                    <div className="card">
                        <h2>🎯 Controles táticos</h2>

                        <label htmlFor="formacao">Formação</label>
                        <select id="formacao" value={tatica.formacao} onChange={e => mudarFormacao(e.target.value)}>
                            {FORMACOES.map(f => <option key={f}>{f}</option>)}
                        </select>

                        <label htmlFor="estilo">Estilo / postura</label>
                        <select id="estilo" value={tatica.estilo} onChange={e => mudarTatica("estilo", e.target.value)}>
                            {ESTILOS.map(s => <option key={s}>{s}</option>)}
                        </select>

                        <label htmlFor="marcacao">Marcação: <b>{tatica.marcacao}</b></label>
                        <input id="marcacao" type="range" min="0" max="100" value={tatica.marcacao}
                               onChange={e => mudarTatica("marcacao", Number(e.target.value))} />

                        <label htmlFor="intensidade">
                            Intensidade: <b>{tatica.intensidade} ({1 + Math.round(tatica.intensidade / 50)} lances por bloco)</b>
                        </label>
                        <input id="intensidade" type="range" min="0" max="100" value={tatica.intensidade}
                               onChange={e => mudarTatica("intensidade", Number(e.target.value))} />

                        <label htmlFor="treino">Foco do treino</label>
                        <select id="treino" value={tatica.treino} onChange={e => mudarTatica("treino", e.target.value)}>
                            {Object.keys(NOMES_HABILIDADES).map(h => (
                                <option key={h} value={h}>{NOMES_HABILIDADES[h]}</option>
                            ))}
                        </select>
                    </div>

                    <div className="card">
                        <h2>💪 Força dos setores</h2>
                        {["ataque", "meio", "defesa"].map(nome => (
                            <div key={nome}>
                                <p className="linha"><span>{capitalizar(nome)}</span><b>{setores[nome]}</b></p>
                                <div className="barra"><div style={{ width: limitar(setores[nome], 0, 100) + "%" }}></div></div>
                            </div>
                        ))}
                        <p className="linha total"><span>Overall do clube</span><b>{overallDoClube(estado)}</b></p>
                    </div>

                    <div className="card">
                        <h2>👥 Reservas</h2>
                        {reservas.length === 0 && <p className="sutil">Sem reservas</p>}
                        {reservas.map(j => (
                            <p className="linha" key={j.id}>
                                <span><Link to={"/jogador/" + j.id}>{j.nome}</Link> <small>{j.posicao}</small></span>
                                <b>{overallNaPosicao(j, j.posicao)}</b>
                            </p>
                        ))}
                    </div>

                    <Link className="botao-amarelo" to="/partida">IR PARA A PARTIDA</Link>
                    <Link className="botao-cinza" to="/">Voltar ao painel</Link>
                </div>
            </div>
        </section>
    );
}
