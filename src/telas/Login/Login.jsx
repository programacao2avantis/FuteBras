/* =====================================================================
   FuteBras - Login.jsx
   Tela de login (antes ficava junto do painel no index.html).
   ===================================================================== */

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useJogo } from "../../contexto/JogoContext";
import "./Login.css";

export default function Login() {
    const { logado, entrar } = useJogo();
    const navegar = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    // Já fez login antes: pula direto para o painel
    if (logado) return <Navigate to="/" replace />;

    function fazerLogin(evento) {
        evento.preventDefault();   // impede o <form> de recarregar a página
        if (!entrar(email.trim(), senha)) {
            setErro("E-mail ou senha incorretos.");
            return;
        }
        navegar("/");
    }

    return (
        <section className="login">
            <div className="login-lado">
                <h2>FuteBras ⚽</h2>
                <p>Prepare-se para uma partida empolgante</p>
            </div>

            {/* <form> faz o Enter funcionar para entrar */}
            <form className="login-form" onSubmit={fazerLogin}>
                <h2>Bem-vindo</h2>
                <p className="sutil">Entre com sua conta para começar uma partida</p>

                <label htmlFor="email">E-mail</label>
                <input id="email" type="email" placeholder="seuemail@exemplo.com" autoComplete="username"
                       value={email} onChange={e => setEmail(e.target.value)} />

                <label htmlFor="senha">Senha</label>
                <input id="senha" type="password" placeholder="••••••••" autoComplete="current-password"
                       value={senha} onChange={e => setSenha(e.target.value)} />

                <button type="submit" className="botao-amarelo">Entrar</button>
                <p className="erro" role="alert">{erro}</p>
                <p className="sutil">Teste: tecnico@futebras.com / 1234</p>
            </form>
        </section>
    );
}
