import { Link } from 'react-router-dom'
import Cabecalho from '../components/Cabecalho.jsx'
import Confronto from '../components/Confronto.jsx'
import { proximaPartida, comparacao, tatica } from '../dados.js'
import '../styles/partida.css'

export default function Partida() {
  return (
    <>
      <Cabecalho />
      <main>
        <h2>🏟️ Pré-jogo</h2>
        <div className="grade">
          <div className="card destaque">
            <p className="sutil">RODADA {proximaPartida.rodada} DE {proximaPartida.totalRodadas} • FORA DE CASA</p>
            <Confronto casa={proximaPartida.casa} fora={proximaPartida.fora} />
            <h2>⚖️ Comparação</h2>
            {comparacao.map((c) => {
              const dif = c.meu - c.adv
              return (
                <p className="linha" key={c.setor}>
                  <span>{c.setor}</span>
                  <b>
                    {c.meu} <span className="sutil">x</span> {c.adv}{' '}
                    <small className={dif >= 0 ? 'dinheiro' : 'negativo'}>({dif >= 0 ? '+' : ''}{dif})</small>
                  </b>
                </p>
              )
            })}
            <p className="sutil">Seu time x {proximaPartida.casa.nome}</p>
          </div>

          <div className="coluna">
            <div className="card">
              <h2>📋 Sua tática</h2>
              <p className="linha"><span>Formação</span><b>{tatica.formacao}</b></p>
              <p className="linha"><span>Estilo</span><b>{tatica.estilo}</b></p>
              <p className="linha"><span>Marcação</span><b>{tatica.marcacao}</b></p>
              <p className="linha"><span>Intensidade</span><b>{tatica.intensidade}</b></p>
              <p className="linha"><span>Foco do treino</span><b>{tatica.treino}</b></p>
              <Link className="botao-verde" to="/escalacao">Ajustar escalação</Link>
            </div>
            <Link className="botao-amarelo" to="/resultado">INICIAR PARTIDA</Link>
            <Link className="botao-cinza" to="/painel">Voltar ao painel</Link>
          </div>
        </div>
      </main>
    </>
  )
}
