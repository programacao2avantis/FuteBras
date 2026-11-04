import { Link } from 'react-router-dom'
import Cabecalho from '../components/Cabecalho.jsx'
import Barra from '../components/Barra.jsx'
import Confronto from '../components/Confronto.jsx'
import { indicadores, tecnico, elenco, classificacao, proximaPartida, tatica, clube } from '../dados.js'
import '../styles/painel.css'

export default function Painel() {
  return (
    <>
      <Cabecalho />
      <main>
        <div className="indicadores">
          {indicadores.map((ind) => (
            <div className="card" key={ind.nome}>
              <span>{ind.nome}</span><strong>{ind.valor}</strong>
              <Barra valor={ind.valor} />
              <small>{ind.legenda}</small>
            </div>
          ))}
        </div>

        <div className="grade">
          <div className="coluna">
            <div className="card">
              <h2>👔 Técnico</h2>
              <p className="linha"><span>Nome</span><b>{tecnico.nome}</b></p>
              <p className="linha"><span>Reputação</span><b>{tecnico.reputacao}</b></p>
              <p className="sutil">PERKS</p>
              <div>
                {tecnico.perks.map((p) => (
                  <span className="perk" title={p.descricao} key={p.nome}>{p.nome}</span>
                ))}
              </div>
            </div>

            <div className="card">
              <h2>👥 Elenco <small className="sutil">clique no nome para ver o jogador</small></h2>
              <div className="rolagem">
                <table>
                  <thead>
                    <tr><th>Jogador</th><th>Pos.</th><th>OVR</th><th>Perk</th><th>Situação</th><th>J</th><th>G</th></tr>
                  </thead>
                  <tbody>
                    {elenco.map((j) => (
                      <tr key={j.nome}>
                        <td><Link to="/jogador">{j.nome}</Link></td>
                        <td>{j.pos}</td>
                        <td className="numero">{j.ovr}</td>
                        <td>{j.perk}</td>
                        <td>{j.situacao}</td>
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
                    {classificacao.map((t, i) => (
                      <tr key={t.time} className={t.meuTime ? 'meu-time' : undefined}>
                        <td>{i + 1}</td>
                        <td>{t.escudo} {t.time}</td>
                        <td><b>{t.p}</b></td>
                        <td>{t.j}</td><td>{t.v}</td><td>{t.e}</td><td>{t.d}</td><td>{t.sg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="coluna">
            <div className="card destaque">
              <p className="sutil">PRÓXIMA PARTIDA • RODADA {proximaPartida.rodada} DE {proximaPartida.totalRodadas}</p>
              <Confronto casa={proximaPartida.casa} fora={proximaPartida.fora} />
              <Link className="botao-amarelo" to="/partida">SIMULAR PARTIDA</Link>
              <p className="centro"><Link to="/resultado">Ver último resultado</Link></p>
            </div>

            <div className="card">
              <h2>📋 Tática atual</h2>
              <p className="linha"><span>Formação</span><b>{tatica.formacao}</b></p>
              <p className="linha"><span>Estilo</span><b>{tatica.estilo}</b></p>
              <p className="linha"><span>Foco do treino</span><b>{tatica.treino}</b></p>
              <Link className="botao-verde" to="/escalacao">Ajustar escalação</Link>
            </div>

            <div className="card">
              <h2>🏟️ Clube</h2>
              <p className="linha"><span>Estádio</span><b>{clube.estadio}</b></p>
              <p className="linha"><span>Torcedores</span><b>{clube.torcedores}</b></p>
              <p className="linha"><span>Patrocínio (temporada)</span><b className="dinheiro">{clube.patrocinio}</b></p>
              <p className="linha"><span>Caixa</span><b className="dinheiro">{clube.caixa}</b></p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
