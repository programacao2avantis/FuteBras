/* Sem login, manda para a tela de login (antes: exigirLogin() do comum.js) */
import { Navigate, Outlet } from "react-router-dom";
import { useJogo } from "../contexto/JogoContext";

export default function RotaProtegida() {
    const { logado } = useJogo();
    if (!logado) return <Navigate to="/login" replace />;
    return <Outlet />;
}
