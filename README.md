# FuteBras ⚽ — versão React

Jogo web de técnico e dirigente de futebol, migrado de HTML/CSS/JS puro para React (Vite).
Cada tela tem seu próprio componente e seu próprio arquivo CSS.

## Rodar no computador

Precisa do Node.js 18 ou mais novo.

```bash
npm install      # só na primeira vez (baixa as dependências)
npm run dev      # abre em http://localhost:5173
```

Login de teste: `tecnico@futebras.com` / `1234`

Para gerar a versão final (pasta `dist/`): `npm run build`

## Estrutura

```
src/
├── main.jsx                 ponto de entrada (carrega o comum.css)
├── App.jsx                  rotas de cada tela
├── estilos/comum.css        cores, cards, botões, tabelas (base de todas as telas)
├── dados/dados.js           dados mocados (jogadores, adversários, calendário)
├── jogo/                    lógica do jogo, sem nada de tela
│   ├── regras.js            tabelas de configuração
│   ├── motor.js             overall, setores, escalação, temporada
│   ├── simulacao.js         simulação da rodada e efeitos pós-jogo
│   ├── armazenamento.js     localStorage (progresso e login)
│   └── utilitarios.js       formatação de dinheiro etc.
├── contexto/JogoContext.jsx guarda o estado do jogo e o login
├── componentes/             peças usadas em mais de uma tela
│   ├── Cabecalho.jsx + .css
│   ├── Layout.jsx, RotaProtegida.jsx, Perk.jsx, Confronto.jsx
└── telas/
    ├── Login/      Login.jsx      + Login.css
    ├── Painel/     Painel.jsx     + Painel.css
    ├── Escalacao/  Escalacao.jsx  + Escalacao.css
    ├── Partida/    Partida.jsx    + Partida.css
    └── Jogador/    Jogador.jsx    + Jogador.css
```

## Rotas

| Endereço             | Tela                              |
|----------------------|-----------------------------------|
| `#/login`            | Login                             |
| `#/`                 | Painel                            |
| `#/escalacao`        | Escalação e tática                |
| `#/partida`          | Pré-jogo / partida / resultado    |
| `#/partida?ultimo=1` | Último resultado                  |
| `#/jogador/12`       | Jogador de id 12                  |

## Como mudar o estado do jogo numa tela

```jsx
const { estado, alterar } = useJogo();

// ler
estado.clube.moral

// mudar (já salva no localStorage e atualiza a tela)
alterar(e => { e.tatica.estilo = "Defesa"; });
```
