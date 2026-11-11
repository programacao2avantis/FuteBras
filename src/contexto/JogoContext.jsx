/* =====================================================================
   FuteBras - JogoContext.jsx
   Guarda o estado do jogo e o login, e entrega para todas as telas.

   Como usar numa tela:
       const { estado, alterar } = useJogo();

   - "estado" é só para LER (mostrar na tela).
   - Para MUDAR algo, use alterar(funcao). A função recebe uma cópia do
     estado e pode alterar à vontade. Depois disso o alterar salva no
     localStorage e a tela atualiza sozinha.
       alterar(e => { e.tatica.estilo = "Defesa"; });
   - O que a função retornar, o alterar retorna também
     (usado na partida para pegar o resultado).
   ===================================================================== */

import { createContext, useContext, useRef, useState } from "react";
import { DADOS } from "../dados/dados";
import { criarEstadoNovo } from "../jogo/motor";
import {
    carregarEstado, salvarEstado,
    estaLogado, registrarLogin, apagarLogin
} from "../jogo/armazenamento";

const JogoContext = createContext(null);

// Abre o jogo salvo. Se não existir (primeira vez), cria um do zero.
function estadoInicial() {
    let estado = carregarEstado();
    if (!estado) {
        estado = criarEstadoNovo();
        salvarEstado(estado);
    }
    return estado;
}

export function JogoProvider({ children }) {
    const [estado, setEstado] = useState(estadoInicial);
    const [logado, setLogado] = useState(estaLogado);

    // Referência sempre com o estado mais recente (evita usar um estado "velho"
    // se duas alterações acontecerem seguidas)
    const atual = useRef(estado);

    function alterar(funcao) {
        const copia = structuredClone(atual.current);
        const retorno = funcao(copia);
        atual.current = copia;
        salvarEstado(copia);
        setEstado(copia);
        return retorno;
    }

    // Apaga o progresso e volta tudo para os dados do mock
    function reiniciarJogo() {
        const novo = criarEstadoNovo();
        atual.current = novo;
        salvarEstado(novo);
        setEstado(novo);
    }

    // Devolve true se o login deu certo
    function entrar(email, senha) {
        if (email !== DADOS.usuario.email || senha !== DADOS.usuario.senha) return false;
        registrarLogin();
        setLogado(true);
        return true;
    }

    function sair() {
        apagarLogin();
        setLogado(false);
    }

    return (
        <JogoContext.Provider value={{ estado, alterar, reiniciarJogo, logado, entrar, sair }}>
            {children}
        </JogoContext.Provider>
    );
}

export function useJogo() {
    return useContext(JogoContext);
}
