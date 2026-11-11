/* =====================================================================
   FuteBras - Painel.jsx
   Tela principal: indicadores, técnico, elenco, classificação,
   próxima partida, tática e clube.
   ===================================================================== */

import { Link, useNavigate } from "react-router-dom";
import { useJogo } from "../../contexto/JogoContext";
import {
    overallDoClube, overallNaPosicao, classificacao,
    proximoJogo, iniciarTemporada, escudo
} from "../../jogo/motor";
import { NOMES_HABILIDADES } from "../../jogo/regras";
import { dinheiro, limitar } from "../../jogo/utilitarios";
import Perk from "../../componentes/Perk";
import Confronto from "../../componentes/Confronto";
import "./Painel.css";

function Indicador({ titulo, valor, texto }) {
    return (
        <div className="card">
            <span>{titulo}</span><strong>{valor}</strong>
            <div className="barra"><div style={{ width: limitar(valor, 0, 100) + "%" }}></div></div>
            <small>{texto}</small>
        </div>
    );
}

export default function Painel() {
    const { estado, alterar, reiniciarJogo } = useJogo();
    const navegar = useNavigate();
    const { clube, tecnico, tatica } = estado;
    const jogo = proximoJogo(estado);

    const textoMoral = clube.moral >= 70 ? "Elenco motivado"
                     : clube.moral >= 40 ? "Situação regular"
                     : "Clima ruim no vestiário";

    function novaTemporada() {
        alterar(e => iniciarTemporada(e));
    }

    function reiniciar() {
        if (!confirm("Apagar todo o progresso e começar do zero?")) return;
        reiniciarJogo();
    }

    return (
        <section>
            <div className="indicadores">
                <Indicador titulo="Overall" valor={overallDoClube(estado)} texto="Nível geral do clube" />
                <Indicador titulo="Moral" valor={clube.moral} texto={textoMoral} />
                <Indicador titulo="Entrosamento" valor={clube.entrosamento} texto="Cresce jogando com o mesmo time" />
                <Indicador titulo="Reputação" valor={tecnico.reputacao} texto="Reputação do técnico" />
            </div>

            <div className="grade">
                <div className="coluna">
                    <div className="card">
                        <h2>👔 Técnico</h2>
                        <p className="linha"><span>Nome</span><b>{tecnico.nome}</b></p>
                        <p className="linha"><span>Reputação</span><b>{tecnico.reputacao}</b></p>
                        <p className="sutil">PERKS</p>
                        <div>{tecnico.perks.map(p => <Perk key={p} perk={p} />)}</div>
                    </div>

                    <div className="card">
                        <h2>👥 Elenco <small className="sutil">clique no nome para ver e ajustar o jogador</small></h2>
                        <div className="rolagem">
                            <table>
                                <thead>
                                    <tr><th>Jogador</th><th>Pos.</th><th>OVR</th><th>Perk</th><th>Situação</th><th>J</th><th>G</th></tr>
                                </thead>
                                <tbody>
                                    {estado.jogadores.map(j => (
                                        <tr key={j.id}>
                                            <td><Link to={"/jogador/" + j.id}>{j.nome}</Link></td>
                                            <td>{j.posicao}</td>
                                            <td className="numero">{overallNaPosicao(j, j.posicao)}</td>
                                            <td>{j.perk || "-"}</td>
                                            <td>{estado.titulares.includes(j.id) ? "Titular" : "Reserva"}</td>
                                            <td>{j.jogos}</td>
                                            <td>{j.gols}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card">
                        <h2>📊 Classificação</h2>
                        <div className="rolagem">
                            <table>
                                <thead>
                                    <tr><th>#</th><th>Time</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th></tr>
                                </thead>
                                <tbody>
                                    {classificacao(estado).map((t, i) => (
                                        <tr key={t.nome} className={t.nome === clube.nome ? "meu-time" : ""}>
                                            <td>{i + 1}</td>
                                            <td>{escudo(estado, t.nome)} {t.nome}</td>
                                            <td><b>{t.pts}</b></td>
                                            <td>{t.j}</td><td>{t.v}</td><td>{t.e}</td><td>{t.d}</td>
                                            <td>{t.gp - t.gc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="coluna">
                    <div className="card destaque">
                        {jogo ? (
                            <>
                                <p className="sutil">
                                    PRÓXIMA PARTIDA • RODADA {estado.rodada + 1} DE {estado.calendario.length}
                                </p>
                                <Confronto casa={jogo[0]} fora={jogo[1]} />
                                <button className="botao-amarelo" onClick={() => navegar("/partida")}>
                                    SIMULAR PARTIDA
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="sutil">TEMPORADA ENCERRADA</p>
                                <div className="confronto"><b>Campeão: {classificacao(estado)[0].nome}</b></div>
                                <button className="botao-amarelo" onClick={novaTemporada}>NOVA TEMPORADA</button>
                            </>
                        )}
                        {estado.ultimoResultado && (
                            <p className="centro"><Link to="/partida?ultimo=1">Ver último resultado</Link></p>
                        )}
                    </div>

                    <div className="card">
                        <h2>📋 Tática atual</h2>
                        <p className="linha"><span>Formação</span><b>{tatica.formacao}</b></p>
                        <p className="linha"><span>Estilo</span><b>{tatica.estilo}</b></p>
                        <p className="linha"><span>Foco do treino</span><b>{NOMES_HABILIDADES[tatica.treino]}</b></p>
                        <Link className="botao-verde" to="/escalacao">Ajustar escalação</Link>
                    </div>

                    <div className="card">
                        <h2>🏟️ Clube</h2>
                        <p className="linha"><span>Estádio</span><b>{clube.estadio.toLocaleString("pt-BR")} lugares</b></p>
                        <p className="linha"><span>Torcedores</span><b>{clube.torcedores.toLocaleString("pt-BR")}</b></p>
                        <p className="linha"><span>Patrocínio (temporada)</span><b className="dinheiro">{dinheiro(clube.patrocinio)}</b></p>
                        <p className="linha"><span>Caixa</span>
                            <b className={clube.caixa < 0 ? "dinheiro negativo" : "dinheiro"}>{dinheiro(clube.caixa)}</b></p>
                        <button className="botao-cinza" onClick={reiniciar}>Reiniciar jogo do zero</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
