import React from "react";
import ReactDOM from "react-dom/client";

// CSS base (cores, cards, botões, tabelas). Fica ANTES do App para que o
// CSS de cada tela (importado dentro da própria tela) venha depois e tenha prioridade.
import "./estilos/comum.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
