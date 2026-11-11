/* =====================================================================
   FuteBras - Partida.jsx
   Pré-jogo, partida ao vivo e resultado.
   A lógica da simulação fica em src/jogo/simulacao.js.

   /partida            -> pré-jogo da próxima rodada
   /partida?ultimo=1   -> reabre o resultado da última partida
   ===================================================================== */

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useJogo } from "../../contexto/JogoContext";
import { calcularSetores, proximoJogo, temporadaEncerrada } from "../../jogo/motor";
import { jogarRodada } from "../../jogo/simulacao";
import { NOMES_HABILIDADES, MS_POR_MINUTO } from "../../jogo/regras";
import { capitalizar, dinheiro } from "../../jogo/utilitarios";
import Confronto from "../../componentes/Confronto";
import "./Partida.css";

// A "key" faz a tela começar do zero sempre que o endereço muda
// (ex.: de /partida?ultimo=1 para /partida pelo menu)
export default function Partida() {
    const local = useLocation();
    return <TelaPartida key={local.key} />;
}

function TelaPartida() {
    const { estado, alterar } = useJogo();
    const [parametros] = useSearchParams();

    // Qual parte mostrar: "pre", "aovivo", "resultado" ou "sem"
    const [fase, setFase] = useState(() => {
        if (parametros.has("ultimo") && estado.ultimoResultado) return "resultado";
        if (!temporadaEncerrada(estado)) return "pre";
        if (estado.ultimoResultado) return "resultado";
        return "sem";
    });
    const [resultado, setResultado] = useState(estado.ultimoResultado);
    const [minuto, setMinuto] = useState(90);

    // Volta ao topo sempre que muda de parte
    useEffect(() => { window.scrollTo(0, 0); }, [fase]);

    // "Transmissão": o relógio anda de 0 a 90
    useEffect(() => {
        if (fase !== "aovivo") return;
        const cronometro = setInterval(() => setMinuto(m => m + 1), MS_POR_MINUTO);
        return () => clearInterval(cronometro);
    }, [fase]);

    useEffect(() => {
        if (fase === "aovivo" && minuto >= 90) setFase("resultado");
    }, [fase, minuto]);

    function iniciarPartida() {
        if (temporadaEncerrada(estado)) return;
        // O jogo é salvo ANTES da animação: se a página fechar no meio, já valeu
        const res = alterar(e => jogarRodada(e));
        setResultado(res);

        // Quem pediu "reduzir movimento" no sistema vai direto para o resultado
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setMinuto(90);
            setFase("resultado");
        } else {
            setMinuto(0);
            setFase("aovivo");
        }
    }

    function pularAnimacao() {
        setMinuto(90);
        setFase("resultado");
    }

    if (fase === "pre") return <PreJogo onIniciar={iniciarPartida} />;

    if (fase === "sem") {
        return (
            <section>
                <div className="card centro">
                    <h2>🏁 Temporada encerrada</h2>
                    <p>Comece uma nova temporada pelo painel.</p>
                    <Link className="botao-amarelo" to="/">IR PARA O PAINEL</Link>
                </div>
            </section>
        );
    }

    const terminou = fase === "resultado";
    return (
        <section>
            <h2>{terminou ? "🏆 Resultado da partida" : "⏱️ Partida em andamento"}</h2>
            <div className="grade">
                <div className="card">
                    <Placar res={resultado} minuto={terminou ? 90 : minuto} terminou={terminou} />
                </div>

                <div className="coluna">
                    {!terminou && (
                        <div className="card">
                            <p className="relogio" aria-live="off">{minuto}'</p>
                            <div className="barra"><div style={{ width: (minuto / 90 * 100) + "%" }}></div></div>
                            <button className="botao-cinza" onClick={pularAnimacao}>Pular para o fim</button>
                        </div>
                    )}

                    {terminou && <PosJogo efeitos={resultado.efeitos} encerrada={temporadaEncerrada(estado)} />}
                </div>
            </div>
        </section>
    );
}


/* ===================== PRÉ-JOGO ===================== */

function PreJogo({ onIniciar }) {
    const { estado } = useJogo();
    const navegar = useNavigate();
    const jogo = proximoJogo(estado);
    const rival = jogo[0] === estado.clube.nome ? jogo[1] : jogo[0];
    const adv = estado.adversarios.find(a => a.nome === rival);
    const meu = calcularSetores(estado);
    const mando = jogo[0] === estado.clube.nome ? "em casa" : "fora de casa";
    const t = estado.tatica;

    return (
        <section>
            <h2>🏟️ Pré-jogo</h2>
            <div className="grade">
                <div className="card destaque">
                    <p className="sutil">
                        RODADA {estado.rodada + 1} DE {estado.calendario.length} • {mando.toUpperCase()}
                    </p>
                    <Confronto casa={jogo[0]} fora={jogo[1]} />

                    <h2>⚖️ Comparação</h2>
                    {/* Seu setor x overall do rival (a IA usa o mesmo valor nos três setores) */}
                    {["ataque", "meio", "defesa"].map(s => {
                        const dif = meu[s] - adv.overall;
                        const classe = dif > 0 ? "dinheiro" : dif < 0 ? "negativo" : "";
                        return (
                            <p className="linha" key={s}>
                                <span>{capitalizar(s)}</span>
                                <b>{meu[s]} <span className="sutil">x</span> {adv.overall}{" "}
                                    <small className={classe}>({dif > 0 ? "+" : ""}{dif})</small></b>
                            </p>
                        );
                    })}
                    <p className="sutil">Seu time x {adv.nome}</p>
                </div>

                <div className="coluna">
                    <div className="card">
                        <h2>📋 Sua tática</h2>
                        <p className="linha"><span>Formação</span><b>{t.formacao}</b></p>
                        <p className="linha"><span>Estilo</span><b>{t.estilo}</b></p>
                        <p className="linha"><span>Marcação</span><b>{t.marcacao}</b></p>
                        <p className="linha"><span>Intensidade</span><b>{t.intensidade}</b></p>
                        <p className="linha"><span>Foco do treino</span><b>{NOMES_HABILIDADES[t.treino]}</b></p>
                        <Link className="botao-verde" to="/escalacao">Ajustar escalação</Link>
                    </div>
                    <button className="botao-amarelo" onClick={onIniciar}>INICIAR PARTIDA</button>
                    <button className="botao-cinza" onClick={() => navegar("/")}>Voltar ao painel</button>
                </div>
            </div>
        </section>
    );
}


/* ===================== PLACAR ===================== */

// Placar até o "minuto" informado (na animação, os gols vão aparecendo)
function Placar({ res, minuto, terminou }) {
    const jogo = res.jogo;
    const golsAteAgora = jogo.gols.filter(g => g.minuto <= minuto);
    const golsCasa = golsAteAgora.filter(g => g.time === jogo.casa).length;
    const golsFora = golsAteAgora.filter(g => g.time === jogo.fora).length;
    const rotulo = { vitoria: "VITÓRIA", empate: "EMPATE", derrota: "DERROTA" }[res.efeitos.situacao];

    return (
        <>
            <div className="centro">
                {terminou
                    ? <span className={"selo " + res.efeitos.situacao}>{rotulo}</span>
                    : <span className="selo empate">AO VIVO</span>}
                <p className="sutil">CAMPEONATO NACIONAL • RODADA {res.rodada}</p>
                <Confronto casa={jogo.casa} fora={jogo.fora}
                           meio={<div className="placar-numero">{golsCasa} x {golsFora}</div>} />
            </div>
            <table>
                <thead><tr><th colSpan="3">Resumo dos gols</th></tr></thead>
                <tbody>
                    {golsAteAgora.length === 0 && (
                        <tr><td colSpan="3">{terminou ? "Nenhum gol na partida" : "Ainda sem gols"}</td></tr>
                    )}
                    {golsAteAgora.map((g, i) => (
                        // O gol mais recente pisca em amarelo durante a transmissão
                        <tr key={i} className={!terminou && i === golsAteAgora.length - 1 ? "gol-novo" : ""}>
                            <td>{g.minuto}'</td>
                            <td>⚽ <b>{g.autor}</b></td>
                            <td className="sutil">{g.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}


/* ===================== PÓS-JOGO ===================== */

function PosJogo({ efeitos: ef, encerrada }) {
    const diferenca = v => (v >= 0 ? "+" : "") + v;
    const fim = ef.fimTemporada;

    const linhas = (lista, sinal) => lista.map(([nome, valor]) => (
        <p className="linha" key={nome}><span>{nome}</span><b>{sinal} {dinheiro(valor)}</b></p>
    ));

    return (
        <>
            <div className="card">
                <h2>📈 Evolução da equipe</h2>
                <p className="linha"><span>Moral</span>
                    <b>{ef.moralAntes} → {ef.moralDepois} ({diferenca(ef.moralDepois - ef.moralAntes)})</b></p>
                <p className="linha"><span>Entrosamento</span>
                    <b>{ef.entrosamentoAntes} → {ef.entrosamentoDepois} ({diferenca(ef.entrosamentoDepois - ef.entrosamentoAntes)})</b></p>
                {ef.treino.length
                    ? <p>🏋️ Treino de {NOMES_HABILIDADES[ef.treinoHabilidade]}: {ef.treino.join(", ")} evoluíram +1</p>
                    : <p className="sutil">🏋️ Ninguém evoluiu no treino desta rodada</p>}
                {ef.avisos.map((a, i) => <p className="aviso" key={i}>⚠️ {a}</p>)}
            </div>

            <div className="card">
                <h2>💰 Finanças da rodada</h2>
                {linhas(ef.receitas, "+")}
                {linhas(ef.despesas, "−")}
                <p className="linha total"><span>Saldo</span>
                    <b className={ef.saldo < 0 ? "negativo" : "dinheiro"}>{dinheiro(ef.saldo)}</b></p>
                <p className="linha"><span>Caixa após a rodada</span><b>{dinheiro(ef.caixaDepois)}</b></p>
            </div>

            {fim && (
                <div className="card destaque">
                    <h2>🏁 Fim de temporada</h2>
                    <p className="linha"><span>Campeão</span><b>{fim.campeao}</b></p>
                    <p className="linha"><span>Sua posição</span><b>{fim.posicao}º lugar</b></p>
                    <p className="linha"><span>Premiação final</span><b>{dinheiro(fim.premio)}</b></p>
                </div>
            )}

            <Link className="botao-amarelo" to="/">VOLTAR AO PAINEL</Link>
            {/* Só mostra "Próxima partida" se ainda houver rodada */}
            {!encerrada && <Link className="botao-verde" to="/partida">Próxima partida</Link>}
        </>
    );
}
