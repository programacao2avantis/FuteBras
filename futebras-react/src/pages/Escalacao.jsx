import { Link } from 'react-router-dom'
import Cabecalho from '../components/Cabecalho.jsx'
import Barra from '../components/Barra.jsx'
import { escalacao, reservas, forcaSetores, tatica, opcoes } from '../dados.js'
import '../styles/escalacao.css'

export default function Escalacao() {
  return (
    <>
      <Cabecalho />
      <main>
        <h2>📋 Escalação e tática</h2>
        <p className="sutil">Escolha quem joga em cada vaga. Jogador fora da posição perde overall.</p>

        <div className="grade">
          <div className="card">
            <h2>⚽ Time titular</h2>
            <div className="campo">
              {escalacao.map((linha, i) => (
                <div className="linha-campo" key={i}>
                  {linha.map((v) => (
                    <div className="vaga" key={v.nome}>
                      <span className="posicao">{v.pos} • {v.ovr}</span>
                      <select aria-label={`Vaga ${v.pos}`}>
                        <option>{v.nome} ({v.pos}) {v.ovr}</option>
                      </select>
                      <Link className="ver-jogador" to="/jogador">ver jogador</Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <Link className="botao-verde" to="/escalacao">Escalar o melhor time automaticamente</Link>
          </div>

          <div className="coluna">
            <div className="card">
              <h2>🎯 Controles táticos</h2>

              <label htmlFor="formacao">Formação</label>
              <select id="formacao" defaultValue={tatica.formacao}>
                {opcoes.formacoes.map((f) => <option key={f}>{f}</option>)}
              </select>

              <label htmlFor="estilo">Estilo / postura</label>
              <select id="estilo" defaultValue={tatica.estilo}>
                {opcoes.estilos.map((e) => <option key={e}>{e}</option>)}
              </select>

              <label htmlFor="marcacao">Marcação: <b>{tatica.marcacao}</b></label>
              <input id="marcacao" type="range" min="0" max="100" defaultValue={tatica.marcacao} />

              <label htmlFor="intensidade">Intensidade: <b>{tatica.intensidade} (2 lances por bloco)</b></label>
              <input id="intensidade" type="range" min="0" max="100" defaultValue={tatica.intensidade} />

              <label htmlFor="treino">Foco do treino</label>
              <select id="treino" defaultValue={tatica.treino}>
                {opcoes.treinos.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div className="card">
              <h2>💪 Força dos setores</h2>
              <p className="linha"><span>Ataque</span><b>{forcaSetores.ataque}</b></p>
              <Barra valor={forcaSetores.ataque} />
              <p className="linha"><span>Meio</span><b>{forcaSetores.meio}</b></p>
              <Barra valor={forcaSetores.meio} />
              <p className="linha"><span>Defesa</span><b>{forcaSetores.defesa}</b></p>
              <Barra valor={forcaSetores.defesa} />
              <p className="linha total"><span>Overall do clube</span><b>{forcaSetores.overall}</b></p>
            </div>

            <div className="card">
              <h2>👥 Reservas</h2>
              {reservas.map((r) => (
                <p className="linha" key={r.nome}>
                  <span><Link to="/jogador">{r.nome}</Link> <small>{r.pos}</small></span><b>{r.ovr}</b>
                </p>
              ))}
            </div>

            <Link className="botao-amarelo" to="/partida">IR PARA A PARTIDA</Link>
            <Link className="botao-cinza" to="/painel">Voltar ao painel</Link>
          </div>
        </div>
      </main>
    </>
  )
}
