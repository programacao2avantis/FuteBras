import { Link } from 'react-router-dom'
import Cabecalho from '../components/Cabecalho.jsx'
import '../styles/login.css'

export default function Login() {
  return (
    <>
      <Cabecalho semMenu />
      <main>
        <div className="login">
          <div className="login-lado">
            <h2>FuteBras ⚽</h2>
            <p>Prepare-se para uma partida empolgante</p>
          </div>
          <div className="login-form">
            <h2>Bem-vindo</h2>
            <p className="sutil">Entre com sua conta para começar uma partida</p>

            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" placeholder="seuemail@exemplo.com" defaultValue="tecnico@futebras.com" />

            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" placeholder="••••••••" defaultValue="1234" />

            {/* protótipo: "Entrar" é só um link para o painel */}
            <Link className="botao-amarelo" to="/painel">Entrar</Link>
            <p className="sutil">Teste: tecnico@futebras.com / 1234</p>
          </div>
        </div>
      </main>
    </>
  )
}
