import { Link } from 'react-router-dom'
import Cabecalho from '../components/Cabecalho.jsx'
import { jogadorExemplo as j, opcoes } from '../dados.js'
import '../styles/jogador.css'

export default function Jogador() {
  const perkSelecionado = opcoes.perks.find((p) => p.startsWith(j.perk.nome)) ?? 'Sem perk'

  return (
    <>
      <Cabecalho />
      <main>
        <h2>👤 Detalhes do jogador</h2>

        {/* protótipo: sempre mostra o mesmo jogador (Lucas) */}
        <div className="barra-jogadores">
          <Link className="botao-pequeno" to="/jogador" aria-label="Jogador anterior">◀</Link>
          <select aria-label="Escolher jogador"><option>{j.nome} ({j.pos})</option></select>
          <Link className="botao-pequeno" to="/jogador" aria-label="Próximo jogador">▶</Link>
        </div>

        <div className="grade" id="detalhes-jogador">
          <div className="coluna">
            <div className="card centro">
              <div className="avatar">👤</div>
              <h2>{j.nome}</h2>
              <p className="sutil">{j.pos} • {j.idade} anos</p>
              <div className="overall-grande">{j.overall}</div>
              <p><span className="perk" title={j.perk.descricao}>{j.perk.nome}</span></p>
              <p className="sutil">{j.situacao}</p>
            </div>

            <div className="card">
              <h2>📄 Informações</h2>

              <label htmlFor="campo-nome">Nome</label>
              <input id="campo-nome" type="text" defaultValue={j.nome} />

              <label htmlFor="campo-posicao">Posição</label>
              <select id="campo-posicao" defaultValue={j.pos}>
                {opcoes.posicoes.map((p) => <option key={p}>{p}</option>)}
              </select>

              <label htmlFor="campo-perk">Perk</label>
              <select id="campo-perk" defaultValue={perkSelecionado}>
                {opcoes.perks.map((p) => <option key={p}>{p}</option>)}
              </select>

              <label htmlFor="campo-idade">Idade</label>
              <input id="campo-idade" type="number" defaultValue={j.idade} />

              <label htmlFor="campo-salario">Salário por rodada (R$)</label>
              <input id="campo-salario" type="number" defaultValue={j.salario} />

              <p className="linha"><span>Jogos na temporada</span><b>{j.jogos}</b></p>
              <p className="linha"><span>Gols na temporada</span><b>{j.gols}</b></p>
            </div>
          </div>

          <div className="card">
            <h2>📊 Habilidades (1 a 10)</h2>
            {j.habilidades.map((h, i) => (
              <div className="hab-controle" key={h.nome}>
                <label htmlFor={`hab-${i}`}><span>{h.nome}</span><span><b>{h.valor}</b></span></label>
                <input id={`hab-${i}`} type="range" min="1" max="10" step="1" defaultValue={h.valor} />
              </div>
            ))}
          </div>

          <div className="coluna">
            <div className="card">
              <h2>🔁 Overall por posição</h2>
              <p className="sutil">Cada posição usa habilidades diferentes</p>
              {Object.entries(j.overallPorPosicao).map(([pos, ovr]) => (
                <p className={pos === j.pos ? 'linha melhor' : 'linha'} key={pos}>
                  <span>{pos} {pos === j.pos && <small className="sutil">(posição atual)</small>}</span>
                  <b>{ovr}</b>
                </p>
              ))}
              <p className="linha total"><span>Overall do clube</span><b>78</b></p>
              <p className="linha"><span>Folha salarial por rodada</span><b>R$ 212.000</b></p>
            </div>

            <div className="card">
              <h2>💾 Ajustes</h2>
              <p className="sutil">Nenhuma alteração</p>
              <Link className="botao-amarelo" to="/jogador">Salvar alterações</Link>
              <Link className="botao-cinza" to="/jogador">Descartar alterações</Link>
              <Link className="botao-cinza" to="/jogador">Voltar aos valores originais</Link>
            </div>

            <Link className="botao-verde" to="/escalacao">Ir para a escalação</Link>
            <Link className="botao-cinza" to="/painel">Voltar ao painel</Link>
          </div>
        </div>
      </main>
    </>
  )
}
