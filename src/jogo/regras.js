/* =====================================================================
   FuteBras - regras.js
   Tabelas de configuração do jogo (antes: seção 1 do comum.js).
   ===================================================================== */

export const POSICOES = ["GOL", "ZAG", "MEI", "ATA"];

// Cada posição valoriza habilidades diferentes (pitch, slide 8)
export const HABILIDADES_DA_POSICAO = {
    GOL: ["goleiro"],
    ZAG: ["marcacao", "desarme", "forca"],
    MEI: ["passe", "drible", "resistencia"],
    ATA: ["finalizacao", "drible", "velocidade"]
};

// Em qual setor cada posição joga (pitch, slide 6)
export const SETOR_DA_POSICAO = { GOL: "defesa", ZAG: "defesa", MEI: "meio", ATA: "ataque" };

// Bônus de cada estilo de jogo em cada setor (pitch, slide 7)
export const BONUS_ESTILO = {
    "Posse de bola":  { ataque: 0,  meio: 4, defesa: 0 },
    "Jogo reativo":   { ataque: -2, meio: 0, defesa: 4 },
    "Ataque intenso": { ataque: 5,  meio: 0, defesa: -3 },
    "Defesa":         { ataque: -4, meio: 0, defesa: 6 }
};

export const NOMES_HABILIDADES = {
    finalizacao: "Finalização", drible: "Drible", passe: "Passe",
    marcacao: "Marcação", desarme: "Desarme", velocidade: "Velocidade",
    resistencia: "Resistência", forca: "Força", goleiro: "Goleiro"
};

export const DESCRICAO_PERKS = {
    "Copeiro": "+2 no ataque do time",
    "Paizão": "derrota tira metade da moral",
    "Casca-grossa": "+3 de overall em campo",
    "Amarelão": "-3 de overall em campo",
    "Marrento": "+2 de overall, mas no banco derruba a moral",
    "Pegador de pênalti": "reduz a chance de gol do adversário"
};

export const FORMACOES = ["4-3-3", "4-4-2", "3-5-2", "5-3-2"];
export const ESTILOS = Object.keys(BONUS_ESTILO);

// Premiação de fim de temporada, por posição (1º ao 6º)
export const PREMIO_FINAL = [1000000, 600000, 400000, 200000, 100000, 0];

// Duração da "transmissão": milissegundos por minuto de jogo (90 x 50ms = 4,5s)
export const MS_POR_MINUTO = 50;
