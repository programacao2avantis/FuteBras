import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/painel', texto: 'Painel' },
  { to: '/escalacao', texto: 'Escalação' },
  { to: '/partida', texto: 'Partida' },
  { to: '/jogador', texto: 'Jogadores' },
  { to: '/', texto: 'Sair' },
]

// Cabeçalho único para todas as páginas. Na tela de login: <Cabecalho semMenu />
export default function Cabecalho({ semMenu = false }) {
  const { pathname } = useLocation()

  function estaAtivo(to) {
    if (to === '/') return false
    // a tela de resultado faz parte de "Partida"
    if (to === '/partida' && pathname === '/resultado') return true
    return pathname === to
  }

  return (
    <header>
      <div>
        <h1>⚽ FuteBras</h1>
        <p>Técnico e dirigente</p>
      </div>
      {!semMenu && (
        <nav>
          {LINKS.map((l) => (
            <Link key={l.texto} to={l.to} className={estaAtivo(l.to) ? 'ativo' : undefined}>
              {l.texto}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
