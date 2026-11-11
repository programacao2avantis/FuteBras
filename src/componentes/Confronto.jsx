/* Escudo x escudo (usado no painel e na partida).
   "meio" é o que fica entre os times: "VS" ou o placar. */
import { useJogo } from "../contexto/JogoContext";
import { escudo } from "../jogo/motor";

export default function Confronto({ casa, fora, meio }) {
    const { estado } = useJogo();
    return (
        <div className="confronto">
            <div><span className="escudo">{escudo(estado, casa)}</span><b>{casa}</b></div>
            {meio ?? <span className="vs">VS</span>}
            <div><span className="escudo">{escudo(estado, fora)}</span><b>{fora}</b></div>
        </div>
    );
}
