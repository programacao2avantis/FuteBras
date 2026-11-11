/* =====================================================================
   FuteBras - dados.js
   DADOS MOCADOS do jogo (antes ficavam num <script type="application/json">
   dentro do index.html).
   Agora o jogo tem várias páginas, e todas precisam desses dados.
   Por que .js e não .json? Um .json separado precisaria de fetch(), que o
   navegador bloqueia quando a página é aberta direto como file://.
   No React, basta importar: import { DADOS } from "../dados/dados";
   Habilidades vão de 1 a 10 (regra do pitch).
   ===================================================================== */

export const DADOS = {
    "usuario": { "email": "tecnico@futebras.com", "senha": "1234" },

    "tecnico": { "nome": "Vanderlei", "reputacao": 58, "perks": ["Copeiro", "Paizão"] },

    "clube": {
        "nome": "Atlético FC", "escudo": "🛡️",
        "estadio": 18000, "torcedores": 12450, "precoIngresso": 20,
        "patrocinio": 850000, "caixa": 4250000,
        "moral": 50, "entrosamento": 62
    },

    "jogadores": [
        { "id": 1,  "nome": "André",    "posicao": "GOL", "idade": 29, "salario": 22000, "perk": "Pegador de pênalti",
          "hab": { "finalizacao": 1, "drible": 2, "passe": 5, "marcacao": 2, "desarme": 2, "velocidade": 4, "resistencia": 6, "forca": 6, "goleiro": 8 } },
        { "id": 2,  "nome": "Marcos",   "posicao": "GOL", "idade": 21, "salario": 8000, "perk": "",
          "hab": { "finalizacao": 1, "drible": 2, "passe": 4, "marcacao": 2, "desarme": 2, "velocidade": 5, "resistencia": 6, "forca": 5, "goleiro": 7 } },

        { "id": 3,  "nome": "Bruno",    "posicao": "ZAG", "idade": 27, "salario": 18000, "perk": "Casca-grossa",
          "hab": { "finalizacao": 3, "drible": 3, "passe": 5, "marcacao": 7, "desarme": 8, "velocidade": 5, "resistencia": 7, "forca": 7, "goleiro": 1 } },
        { "id": 4,  "nome": "Felipe",   "posicao": "ZAG", "idade": 25, "salario": 15000, "perk": "",
          "hab": { "finalizacao": 2, "drible": 3, "passe": 5, "marcacao": 7, "desarme": 7, "velocidade": 6, "resistencia": 7, "forca": 7, "goleiro": 1 } },
        { "id": 5,  "nome": "Thiago",   "posicao": "ZAG", "idade": 30, "salario": 17000, "perk": "",
          "hab": { "finalizacao": 3, "drible": 2, "passe": 4, "marcacao": 7, "desarme": 7, "velocidade": 4, "resistencia": 6, "forca": 8, "goleiro": 1 } },
        { "id": 6,  "nome": "Gustavo",  "posicao": "ZAG", "idade": 23, "salario": 11000, "perk": "",
          "hab": { "finalizacao": 2, "drible": 4, "passe": 6, "marcacao": 6, "desarme": 7, "velocidade": 7, "resistencia": 7, "forca": 7, "goleiro": 1 } },
        { "id": 7,  "nome": "Henrique", "posicao": "ZAG", "idade": 20, "salario": 7000, "perk": "Amarelão",
          "hab": { "finalizacao": 2, "drible": 3, "passe": 5, "marcacao": 6, "desarme": 6, "velocidade": 6, "resistencia": 6, "forca": 7, "goleiro": 1 } },

        { "id": 8,  "nome": "Rafael",   "posicao": "MEI", "idade": 26, "salario": 20000, "perk": "",
          "hab": { "finalizacao": 6, "drible": 8, "passe": 8, "marcacao": 5, "desarme": 5, "velocidade": 6, "resistencia": 7, "forca": 5, "goleiro": 1 } },
        { "id": 9,  "nome": "Caio",     "posicao": "MEI", "idade": 24, "salario": 14000, "perk": "",
          "hab": { "finalizacao": 5, "drible": 7, "passe": 7, "marcacao": 5, "desarme": 6, "velocidade": 6, "resistencia": 7, "forca": 6, "goleiro": 1 } },
        { "id": 10, "nome": "Mateus",   "posicao": "MEI", "idade": 28, "salario": 16000, "perk": "Marrento",
          "hab": { "finalizacao": 6, "drible": 7, "passe": 7, "marcacao": 6, "desarme": 6, "velocidade": 5, "resistencia": 8, "forca": 6, "goleiro": 1 } },
        { "id": 11, "nome": "João",     "posicao": "MEI", "idade": 19, "salario": 6000, "perk": "",
          "hab": { "finalizacao": 5, "drible": 6, "passe": 6, "marcacao": 4, "desarme": 5, "velocidade": 7, "resistencia": 7, "forca": 5, "goleiro": 1 } },

        { "id": 12, "nome": "Lucas",    "posicao": "ATA", "idade": 24, "salario": 25000, "perk": "Casca-grossa",
          "hab": { "finalizacao": 9, "drible": 8, "passe": 6, "marcacao": 3, "desarme": 3, "velocidade": 8, "resistencia": 8, "forca": 8, "goleiro": 1 } },
        { "id": 13, "nome": "Pedro",    "posicao": "ATA", "idade": 27, "salario": 16000, "perk": "",
          "hab": { "finalizacao": 8, "drible": 7, "passe": 5, "marcacao": 3, "desarme": 3, "velocidade": 7, "resistencia": 7, "forca": 6, "goleiro": 1 } },
        { "id": 14, "nome": "Vitor",    "posicao": "ATA", "idade": 22, "salario": 12000, "perk": "",
          "hab": { "finalizacao": 7, "drible": 7, "passe": 5, "marcacao": 2, "desarme": 3, "velocidade": 8, "resistencia": 6, "forca": 5, "goleiro": 1 } },
        { "id": 15, "nome": "Igor",     "posicao": "ATA", "idade": 18, "salario": 5000, "perk": "",
          "hab": { "finalizacao": 6, "drible": 6, "passe": 4, "marcacao": 2, "desarme": 2, "velocidade": 7, "resistencia": 6, "forca": 5, "goleiro": 1 } }
    ],

    "adversarios": [
        { "nome": "Real União",     "escudo": "🔰", "overall": 72, "artilheiros": ["Diego", "Wallace", "Kauã"] },
        { "nome": "Porto Azul",     "escudo": "⚓", "overall": 70, "artilheiros": ["Marcelo", "Ícaro", "Dudu"] },
        { "nome": "Grêmio Litoral", "escudo": "🌊", "overall": 77, "artilheiros": ["Renan", "Bianchi", "Tales"] },
        { "nome": "Esporte Vale",   "escudo": "🌄", "overall": 66, "artilheiros": ["Wesley", "Nando", "Paulinho"] },
        { "nome": "União Serrana",  "escudo": "⛰️", "overall": 74, "artilheiros": ["Jonas", "Matheus", "Alan"] }
    ],

    "calendario": [
        [["Atlético FC", "Real União"],     ["Porto Azul", "União Serrana"],  ["Grêmio Litoral", "Esporte Vale"]],
        [["União Serrana", "Atlético FC"],  ["Real União", "Esporte Vale"],   ["Porto Azul", "Grêmio Litoral"]],
        [["Atlético FC", "Esporte Vale"],   ["União Serrana", "Grêmio Litoral"], ["Real União", "Porto Azul"]],
        [["Grêmio Litoral", "Atlético FC"], ["Esporte Vale", "Porto Azul"],   ["União Serrana", "Real União"]],
        [["Atlético FC", "Porto Azul"],     ["Grêmio Litoral", "Real União"], ["Esporte Vale", "União Serrana"]]
    ]
};
