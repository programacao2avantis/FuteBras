/* =====================================================================
   FuteBras - App.jsx
   Rotas do jogo. Cada rota é uma tela em src/telas/<Tela>/.

   Usamos HashRouter (endereços com #, ex.: /#/escalacao) porque ele
   funciona em qualquer hospedagem estática, inclusive GitHub Pages,
   sem configuração extra no servidor.
   ===================================================================== */

import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import { JogoProvider } from "./contexto/JogoContext";
import Layout from "./componentes/Layout";
import RotaProtegida from "./componentes/RotaProtegida";

import Login from "./telas/Login/Login";
import Painel from "./telas/Painel/Painel";
import Escalacao from "./telas/Escalacao/Escalacao";
import Partida from "./telas/Partida/Partida";
import Jogador from "./telas/Jogador/Jogador";

const router = createHashRouter([
    {
        element: <Layout />,
        children: [
            { path: "/login", element: <Login /> },
            {
                // Tudo aqui dentro exige login
                element: <RotaProtegida />,
                children: [
                    { path: "/", element: <Painel /> },
                    { path: "/escalacao", element: <Escalacao /> },
                    { path: "/partida", element: <Partida /> },
                    { path: "/jogador", element: <Jogador /> },
                    { path: "/jogador/:id", element: <Jogador /> }
                ]
            },
            { path: "*", element: <Navigate to="/" replace /> }
        ]
    }
]);

export default function App() {
    return (
        <JogoProvider>
            <RouterProvider router={router} />
        </JogoProvider>
    );
}
