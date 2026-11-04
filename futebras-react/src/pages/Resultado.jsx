import { Link } from 'react-router-dom'
import Cabecalho from '../components/Cabecalho.jsx'
import Confronto from '../components/Confronto.jsx'
import { ultimoResultado as r } from '../dados.js'
import '../styles/partida.css'

const SELO = { vitoria: 'VITÓRIA', empate: 'EMPATE', derrota: 'DERROTA' }

function variacao([antes, depois]) {
  const d = depois - antes
  return `${antes} → ${depois} (${d >= 0 ? '+' : ''}${d})`
}

export default function Resultado() {
  return (
    <>
      <Cabecalho />
      <main>
        <h2>🏆 Resultado da partida</h2>
        <div className="grade">
          <div className="card">
            <div className="centro">
              <span className={`selo ${r.tipo}`}>{SELO[r.tipo]}</span>
              <p className="sutil">CAMPEONATO NACIONAL • RODADA {r.rodada}</p>
              <Confronto
                casa={r.casa}
                fora={r.fora}
                meio={<div className="placar-numero">{r.casa.gols} x {r.fora.gols}</div>}
              />
            </div>
            <table>
              <thead><tr><th colSpan="3">Resumo dos gols</th></tr></thead>
              <tbody>
                {r.gols.map((g) => (
                  <tr key={g.minuto}>
                    <td>{g.minuto}'</td>
                    <td>⚽ <b>{g.jogador}</b></td>
                    <td className="sutil">{g.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="coluna">
            <div className="card">
              <h2>📈 Evolução da equipe</h2>
              <p className="linha"><span>Moral</span><b>{variacao(r.evolucao.moral)}</b></p>
              <p className="linha"><span>Entrosamento</span><b>{variacao(r.evolucao.entrosamento)}</b></p>
              <p>🏋️ {r.treino}</p>
              <p className="aviso">⚠️ {r.aviso}</p>
            </div>

            <div className="card">
              <h2>💰 Finanças da rodada</h2>
              {r.financas.map((f) => (
                <p className="linha" key={f.item}><span>{f.item}</span><b>{f.valor}</b></p>
              ))}
              <p className="linha total"><span>Saldo</span><b className="negativo">{r.saldo}</b></p>
              <p className="linha"><span>Caixa após a rodada</span><b>{r.caixaApos}</b></p>
            </div>

            <Link className="botao-amarelo" to="/painel">VOLTAR AO PAINEL</Link>
            <Link className="botao-verde" to="/partida">Próxima partida</Link>
          </div>
        </div>
      </main>
    </>
  )
}
