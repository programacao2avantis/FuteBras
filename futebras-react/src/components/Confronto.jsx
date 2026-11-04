// Confronto usado no painel, na partida e no resultado.
// "meio" é o que aparece entre os times (se não passar nada, mostra VS)
export default function Confronto({ casa, fora, meio }) {
  return (
    <div className="confronto">
      <div><span className="escudo">{casa.escudo}</span><b>{casa.nome}</b></div>
      {meio ?? <span className="vs">VS</span>}
      <div><span className="escudo">{fora.escudo}</span><b>{fora.nome}</b></div>
    </div>
  )
}
