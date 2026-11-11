/* Moldura comum a todas as telas: cabeçalho em cima, tela da rota embaixo */
import { Outlet } from "react-router-dom";
import Cabecalho from "./Cabecalho";

export default function Layout() {
    return (
        <>
            <Cabecalho />
            <main>
                <Outlet />
            </main>
        </>
    );
}
