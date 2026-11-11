/* Cabeçalho com o menu. O menu só aparece depois do login. */
import { NavLink, useNavigate } from "react-router-dom";
import { useJogo } from "../contexto/JogoContext";
import "./Cabecalho.css";

// NavLink coloca a classe "ativo" no link da tela aberta
const classeLink = ({ isActive }) => (isActive ? "ativo" : "");

export default function Cabecalho() {
    const { logado, sair } = useJogo();
    const navegar = useNavigate();

    function fazerLogout() {
        sair();
        navegar("/login");
    }

    return (
        <header className="cabecalho">
            <div>
                <h1>⚽ FuteBras</h1>
                <p>Técnico e dirigente</p>
            </div>

            {logado && (
                <nav className="menu">
                    <NavLink to="/" end className={classeLink}>Painel</NavLink>
                    <NavLink to="/escalacao" className={classeLink}>Escalação</NavLink>
                    <NavLink to="/partida" className={classeLink}>Partida</NavLink>
                    <NavLink to="/jogador" className={classeLink}>Jogadores</NavLink>
                    <button onClick={fazerLogout}>Sair</button>
                </nav>
            )}
        </header>
    );
}
