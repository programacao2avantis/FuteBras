// =====================================================================
// FuteBras - dados fictícios do protótipo
// Tudo que antes estava "escrito à mão" no HTML agora fica aqui.
// Quando o jogo virar funcional, é só trocar isto por dados reais (API, estado etc.)
// =====================================================================

export const tecnico = {
  nome: 'Vanderlei',
  reputacao: 60,
  perks: [
    { nome: 'Copeiro', descricao: '+2 no ataque do time' },
    { nome: 'Paizão', descricao: 'derrota tira metade da moral' },
  ],
}

export const indicadores = [
  { nome: 'Overall', valor: 78, legenda: 'Nível geral do clube' },
  { nome: 'Moral', valor: 64, legenda: 'Situação regular' },
  { nome: 'Entrosamento', valor: 68, legenda: 'Cresce jogando com o mesmo time' },
  { nome: 'Reputação', valor: 60, legenda: 'Reputação do técnico' },
]

export const elenco = [
  { nome: 'André', pos: 'GOL', ovr: 80, perk: 'Pegador de pênalti', situacao: 'Titular', jogos: 3, gols: 0 },
  { nome: 'Marcos', pos: 'GOL', ovr: 70, perk: '-', situacao: 'Reserva', jogos: 0, gols: 0 },
  { nome: 'Bruno', pos: 'ZAG', ovr: 73, perk: 'Casca-grossa', situacao: 'Titular', jogos: 3, gols: 1 },
  { nome: 'Felipe', pos: 'ZAG', ovr: 70, perk: '-', situacao: 'Titular', jogos: 3, gols: 0 },
  { nome: 'Thiago', pos: 'ZAG', ovr: 73, perk: '-', situacao: 'Titular', jogos: 3, gols: 0 },
  { nome: 'Gustavo', pos: 'ZAG', ovr: 67, perk: '-', situacao: 'Titular', jogos: 2, gols: 0 },
  { nome: 'Henrique', pos: 'ZAG', ovr: 63, perk: 'Amarelão', situacao: 'Reserva', jogos: 1, gols: 0 },
  { nome: 'Rafael', pos: 'MEI', ovr: 77, perk: '-', situacao: 'Titular', jogos: 3, gols: 1 },
  { nome: 'Caio', pos: 'MEI', ovr: 70, perk: '-', situacao: 'Titular', jogos: 3, gols: 0 },
  { nome: 'Mateus', pos: 'MEI', ovr: 73, perk: 'Marrento', situacao: 'Titular', jogos: 3, gols: 1 },
  { nome: 'João', pos: 'MEI', ovr: 63, perk: '-', situacao: 'Reserva', jogos: 0, gols: 0 },
  { nome: 'Lucas', pos: 'ATA', ovr: 83, perk: 'Casca-grossa', situacao: 'Titular', jogos: 3, gols: 3 },
  { nome: 'Pedro', pos: 'ATA', ovr: 73, perk: '-', situacao: 'Titular', jogos: 3, gols: 1 },
  { nome: 'Vitor', pos: 'ATA', ovr: 77, perk: '-', situacao: 'Titular', jogos: 3, gols: 2 },
  { nome: 'Igor', pos: 'ATA', ovr: 63, perk: '-', situacao: 'Reserva', jogos: 0, gols: 0 },
]

export const classificacao = [
  { escudo: '🛡️', time: 'Atlético FC', p: 7, j: 3, v: 2, e: 1, d: 0, sg: 4, meuTime: true },
  { escudo: '🌊', time: 'Grêmio Litoral', p: 7, j: 3, v: 2, e: 1, d: 0, sg: 3 },
  { escudo: '⛰️', time: 'União Serrana', p: 4, j: 3, v: 1, e: 1, d: 1, sg: 1 },
  { escudo: '🔰', time: 'Real União', p: 4, j: 3, v: 1, e: 1, d: 1, sg: 0 },
  { escudo: '⚓', time: 'Porto Azul', p: 3, j: 3, v: 1, e: 0, d: 2, sg: -2 },
  { escudo: '🌄', time: 'Esporte Vale', p: 1, j: 3, v: 0, e: 1, d: 2, sg: -6 },
]

export const proximaPartida = {
  rodada: 4,
  totalRodadas: 10,
  casa: { escudo: '🌊', nome: 'Grêmio Litoral' },
  fora: { escudo: '🛡️', nome: 'Atlético FC' },
}

export const tatica = {
  formacao: '4-3-3',
  estilo: 'Posse de bola',
  marcacao: 50,
  intensidade: 50,
  treino: 'Finalização',
}

export const opcoes = {
  formacoes: ['4-3-3', '4-4-2', '3-5-2', '5-3-2'],
  estilos: ['Posse de bola', 'Jogo reativo', 'Ataque intenso', 'Defesa'],
  treinos: ['Finalização', 'Drible', 'Passe', 'Marcação', 'Desarme', 'Velocidade', 'Resistência', 'Força', 'Goleiro'],
  posicoes: ['GOL', 'ZAG', 'MEI', 'ATA'],
  perks: [
    'Sem perk',
    'Casca-grossa — +3 de overall em campo',
    'Amarelão — -3 de overall em campo',
    'Marrento — +2 de overall, mas no banco derruba a moral',
    'Pegador de pênalti — reduz a chance de gol do adversário',
  ],
}

export const clube = {
  estadio: '18.000 lugares',
  torcedores: '12.450',
  patrocinio: 'R$ 850.000',
  caixa: 'R$ 3.912.400',
}

// Escalação titular, linha por linha (de cima para baixo no campo)
export const escalacao = [
  [{ pos: 'ATA', nome: 'Vitor', ovr: 77 }, { pos: 'ATA', nome: 'Lucas', ovr: 86 }, { pos: 'ATA', nome: 'Pedro', ovr: 73 }],
  [{ pos: 'MEI', nome: 'Caio', ovr: 70 }, { pos: 'MEI', nome: 'Rafael', ovr: 77 }, { pos: 'MEI', nome: 'Mateus', ovr: 75 }],
  [{ pos: 'ZAG', nome: 'Gustavo', ovr: 67 }, { pos: 'ZAG', nome: 'Bruno', ovr: 76 }, { pos: 'ZAG', nome: 'Thiago', ovr: 73 }, { pos: 'ZAG', nome: 'Felipe', ovr: 70 }],
  [{ pos: 'GOL', nome: 'André', ovr: 80 }],
]

export const reservas = [
  { nome: 'Marcos', pos: 'GOL', ovr: 70 },
  { nome: 'Henrique', pos: 'ZAG', ovr: 63 },
  { nome: 'João', pos: 'MEI', ovr: 63 },
  { nome: 'Igor', pos: 'ATA', ovr: 63 },
]

export const forcaSetores = { ataque: 83, meio: 78, defesa: 76, overall: 79 }

export const comparacao = [
  { setor: 'Ataque', meu: 83, adv: 77 },
  { setor: 'Meio', meu: 78, adv: 77 },
  { setor: 'Defesa', meu: 76, adv: 77 },
]

export const jogadorExemplo = {
  nome: 'Lucas',
  pos: 'ATA',
  idade: 24,
  overall: 83,
  perk: { nome: 'Casca-grossa', descricao: '+3 de overall em campo' },
  situacao: 'Titular',
  salario: 25000,
  jogos: 3,
  gols: 3,
  habilidades: [
    { nome: 'Finalização', valor: 9 },
    { nome: 'Drible', valor: 8 },
    { nome: 'Passe', valor: 6 },
    { nome: 'Marcação', valor: 3 },
    { nome: 'Desarme', valor: 3 },
    { nome: 'Velocidade', valor: 8 },
    { nome: 'Resistência', valor: 8 },
    { nome: 'Força', valor: 8 },
    { nome: 'Goleiro', valor: 1 },
  ],
  overallPorPosicao: { GOL: 10, ZAG: 47, MEI: 73, ATA: 83 },
}

export const ultimoResultado = {
  tipo: 'vitoria', // vitoria | empate | derrota
  rodada: 4,
  casa: { escudo: '🌊', nome: 'Grêmio Litoral', gols: 1 },
  fora: { escudo: '🛡️', nome: 'Atlético FC', gols: 2 },
  gols: [
    { minuto: 12, jogador: 'Lucas', time: 'Atlético FC' },
    { minuto: 48, jogador: 'Renan', time: 'Grêmio Litoral' },
    { minuto: 77, jogador: 'Vitor', time: 'Atlético FC' },
  ],
  evolucao: { moral: [64, 72], entrosamento: [68, 70] },
  treino: 'Treino de Finalização: Pedro, Mateus evoluíram +1',
  aviso: 'João (reserva) pediu mais minutos em campo',
  financas: [
    { item: 'Direitos de transmissão', valor: '+ R$ 60.000' },
    { item: 'Patrocínio', valor: '+ R$ 85.000' },
    { item: 'Premiação por vitória', valor: '+ R$ 50.000' },
    { item: 'Salários', valor: '− R$ 212.000' },
    { item: 'Manutenção do estádio', valor: '− R$ 30.000' },
  ],
  saldo: '−R$ 47.000',
  caixaApos: 'R$ 3.865.400',
}
