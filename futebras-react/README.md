# FuteBras (React + Vite) — protótipo

## Rodar no VS Code
1. Instale o Node.js LTS (https://nodejs.org) se ainda não tiver.
2. Abra esta pasta no VS Code (Arquivo > Abrir Pasta).
3. No terminal do VS Code (Ctrl + ').
   npm install
   npm run dev
4. Abra o endereço que aparecer (normalmente http://localhost:5173).

## Estrutura
- index.html            -> só a "casca"; o React desenha tudo dentro de <div id="root">
- src/main.jsx          -> ponto de entrada (liga o React e o roteador, importa comum.css)
- src/App.jsx           -> rotas: cada antigo .html virou uma rota
- src/dados.js          -> todos os dados fictícios (antes escritos no HTML)
- src/components/       -> pedaços repetidos: Cabecalho, Barra, Confronto
- src/pages/            -> uma página por tela
- src/styles/           -> os CSS originais, sem alteração (index.css virou login.css)

## Antigo -> novo
index.html      -> /           (pages/Login.jsx)
painel.html     -> /painel     (pages/Painel.jsx)
escalacao.html  -> /escalacao  (pages/Escalacao.jsx)
partida.html    -> /partida    (pages/Partida.jsx)
resultado.html  -> /resultado  (pages/Resultado.jsx)
jogador.html    -> /jogador    (pages/Jogador.jsx)

## Diferenças HTML -> JSX (as que mais dão erro)
- class=        -> className=
- for=          -> htmlFor=
- colspan=      -> colSpan=
- style="width:78%"        -> style={{ width: '78%' }}
- <a href="painel.html">   -> <Link to="/painel">
- value="x" em input       -> defaultValue="x"  (senão o campo fica travado)
- <option selected>        -> defaultValue no <select>
- <input> e <br> precisam fechar: <input />
- comentário: {/* ... */}
