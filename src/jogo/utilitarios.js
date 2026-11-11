/* =====================================================================
   FuteBras - utilitarios.js
   Funções pequenas de formatação (antes: seção 5 do comum.js).
   Obs.: a função esc() não existe mais. O React já protege o texto
   digitado pelo usuário automaticamente quando ele aparece na tela.
   ===================================================================== */

export function dinheiro(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

export function limitar(valor, minimo, maximo) {
    return Math.max(minimo, Math.min(maximo, valor));
}

// "ataque" -> "Ataque"
export function capitalizar(texto) {
    return texto[0].toUpperCase() + texto.slice(1);
}

// Soma o segundo item de cada par: [["Salários", 1000], ...]
export function somar(lista) {
    let total = 0;
    lista.forEach(item => total += item[1]);
    return total;
}

export function sortear(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
}
