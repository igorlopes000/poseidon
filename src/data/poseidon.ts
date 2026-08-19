export type AcaoAlpha =
  | "Ativar"
  | "Ativar com ajuste de mix"
  | "Defender"
  | "Priorizar volume"
  | "Monitorar";

export type Prioridade = "Muito alta" | "Alta" | "Média" | "Baixa";

export type StatusContato =
  | "Não contatado"
  | "Retorno agendado"
  | "Negociação em andamento"
  | "Pedido confirmado"
  | "Contato indisponível"
  | "Sem interesse";

export type Categoria =
  | "Bebidas não alcoólicas"
  | "Bebidas alcoólicas"
  | "Bomboniere"
  | "Snacks";

export type CD = "CD Zona Sul — São Paulo" | "CD Osasco";

export type FarolAlpha = "Azul" | "Vermelho" | "Amarelo" | "Verde";

export interface Pdv {
  id: string;
  nome: string;
  franqueado: string;
  bairro: string;
  cd: CD;
  distanciaKm: number;
  faturamento: number;
  sellIn: number;
  aderenciaCd: number;
  aderenciaMix: number;
  categoria: Categoria;
  skus: number;
  acao: AcaoAlpha;
  prioridade: Prioridade;
  status: StatusContato;
  ultimoContato: string | null;
}

export interface VisitaHistorico {
  data: string;
  titulo: string;
  descricao: string;
}

export interface Oferta {
  id: string;
  nome: string;
  condicao: string;
  foco: string;
  validade: string;
}

export interface SugestaoMix {
  atual: string;
  substituto: string;
  categoria: Categoria;
  oportunidade: string;
}

export type StatusNegociacao =
  | "Em negociação"
  | "Promessa registrada"
  | "Pedido confirmado"
  | "Cancelada"
  | "Enviado ao ponto focal";

export interface Negociacao {
  id: string;
  pdvId: string;
  cd: CD;
  oferta: string;
  valor: number;
  dataRetirada: string;
  status: StatusNegociacao;
  observacao: string;
  itens: string;
}

export const DATA_REFERENCIA = "18 de agosto de 2026";
export const VENDEDOR = "Carlos Henrique";
export const AVISO_OFERTA = "Condição demonstrativa sujeita à validação comercial.";

export const CDS: CD[] = ["CD Zona Sul — São Paulo", "CD Osasco"];

export const OFERTAS: Oferta[] = [
  {
    id: "OF-01",
    nome: "Combo Giro Rápido",
    condicao: "12 caixas mistas com condição comercial demonstrativa",
    foco: "Bebidas não alcoólicas",
    validade: "31/08/2026",
  },
  {
    id: "OF-02",
    nome: "Combo Reposição Essencial",
    condicao: "8 caixas com itens de alto giro",
    foco: "Bebidas não alcoólicas e snacks",
    validade: "31/08/2026",
  },
  {
    id: "OF-03",
    nome: "Combo Bomboniere Estratégica",
    condicao: "Mix de itens de bomboniere para reposição",
    foco: "Bomboniere",
    validade: "31/08/2026",
  },
  {
    id: "OF-04",
    nome: "Combo Snacks de Alto Giro",
    condicao: "Reposição de snacks para ponto de venda",
    foco: "Snacks",
    validade: "31/08/2026",
  },
  {
    id: "OF-05",
    nome: "Combo Geladeira Completa",
    condicao: "Mix de bebidas alcoólicas e não alcoólicas",
    foco: "Bebidas",
    validade: "31/08/2026",
  },
  {
    id: "OF-06",
    nome: "Ação Mix Inteligente",
    condicao: "Substituição de itens fora do CD por equivalentes disponíveis",
    foco: "Mix",
    validade: "31/08/2026",
  },
];

export const OFERTAS_POR_CATEGORIA: Record<Categoria, string[]> = {
  "Bebidas não alcoólicas": ["OF-01", "OF-02", "OF-06"],
  "Bebidas alcoólicas": ["OF-05", "OF-01", "OF-06"],
  Bomboniere: ["OF-03", "OF-02", "OF-06"],
  Snacks: ["OF-04", "OF-02", "OF-06"],
};

export const TEXTO_OPORTUNIDADE: Record<AcaoAlpha, string> = {
  Ativar: "Oportunidade de ativar compras recorrentes no CD recomendado.",
  "Ativar com ajuste de mix":
    "Oportunidade de ampliar compras no CD com substituição de itens fora do portfólio.",
  Defender:
    "PDV com boa aderência. Prioridade é preservar volume e evitar perda de participação do CD.",
  "Priorizar volume":
    "PDV de alto faturamento com baixa participação do CD. Avaliar oportunidade mesmo fora do raio ideal.",
  Monitorar:
    "PDV com aderência alta fora do raio ideal. Manter acompanhamento sem priorizar contato imediato.",
};

export const PROXIMA_ACAO: Record<AcaoAlpha, string> = {
  Ativar: "Apresentar o CD recomendado e identificar oportunidade de primeiro pedido.",
  "Ativar com ajuste de mix":
    "Apresentar substitutos disponíveis no CD e oferecer combo de reposição.",
  Defender:
    "Validar satisfação, preservar compra recorrente e identificar risco de perda de volume.",
  "Priorizar volume":
    "Avaliar oportunidade de volume e viabilidade de retirada no CD recomendado.",
  Monitorar: "Acompanhar comportamento de compra e manter disponibilidade para retorno.",
};

export const PROXIMO_PASSO: Record<StatusContato, string> = {
  "Não contatado": "Realizar primeiro contato comercial.",
  "Retorno agendado": "Retornar na data combinada e validar interesse.",
  "Negociação em andamento": "Atualizar condição comercial e confirmar retirada.",
  "Pedido confirmado": "Acompanhar retirada e preparar próxima reposição.",
  "Contato indisponível": "Tentar novo contato em outro horário.",
  "Sem interesse": "Registrar motivo e manter acompanhamento futuro.",
};

export const SUGESTOES_MIX: Record<Categoria, SugestaoMix[]> = {
  "Bebidas não alcoólicas": [
    {
      atual: "Refrigerante 2 L fora do CD",
      substituto: "Refrigerante 2 L disponível no CD",
      categoria: "Bebidas não alcoólicas",
      oportunidade: "Reposição de alto giro com retirada no CD recomendado",
    },
    {
      atual: "Suco pronto 1 L fora do CD",
      substituto: "Suco pronto 1 L disponível no CD",
      categoria: "Bebidas não alcoólicas",
      oportunidade: "Substituição de mix para ampliar aderência",
    },
    {
      atual: "Água saborizada 500 ml fora do CD",
      substituto: "Água saborizada 500 ml disponível no CD",
      categoria: "Bebidas não alcoólicas",
      oportunidade: "Complementar pedido com item de giro recorrente",
    },
  ],
  "Bebidas alcoólicas": [
    {
      atual: "Cerveja lata fora do CD",
      substituto: "Cerveja lata disponível no CD",
      categoria: "Bebidas alcoólicas",
      oportunidade: "Reposição de geladeira com item disponível no CD",
    },
    {
      atual: "Cerveja long neck fora do CD",
      substituto: "Cerveja long neck disponível no CD",
      categoria: "Bebidas alcoólicas",
      oportunidade: "Substituição de mix para reduzir compra fora do CD",
    },
    {
      atual: "Bebida pronta para consumo fora do CD",
      substituto: "Bebida pronta para consumo disponível no CD",
      categoria: "Bebidas alcoólicas",
      oportunidade: "Complementar mix de alto giro",
    },
  ],
  Bomboniere: [
    {
      atual: "Chocolate em barra fora do CD",
      substituto: "Chocolate em barra disponível no CD",
      categoria: "Bomboniere",
      oportunidade: "Reposição com item equivalente disponível",
    },
    {
      atual: "Bombom sortido fora do CD",
      substituto: "Bombom sortido disponível no CD",
      categoria: "Bomboniere",
      oportunidade: "Reposição de ponto de venda com mix disponível",
    },
    {
      atual: "Bala e goma fora do CD",
      substituto: "Bala e goma disponível no CD",
      categoria: "Bomboniere",
      oportunidade: "Ampliar aderência com itens de giro frequente",
    },
  ],
  Snacks: [
    {
      atual: "Salgadinho 45 g fora do CD",
      substituto: "Salgadinho 45 g disponível no CD",
      categoria: "Snacks",
      oportunidade: "Reposição de alto giro com retirada no CD",
    },
    {
      atual: "Biscoito recheado fora do CD",
      substituto: "Biscoito recheado disponível no CD",
      categoria: "Snacks",
      oportunidade: "Substituição de mix com item disponível no CD",
    },
    {
      atual: "Amendoim 100 g fora do CD",
      substituto: "Amendoim 100 g disponível no CD",
      categoria: "Snacks",
      oportunidade: "Complementar pedido para ampliar participação do CD",
    },
  ],
};

export const HISTORICO_BASE = {
  retorno: {
    data: "14/08/2026",
    titulo: "Retorno agendado",
    descricao: "Franqueado solicitou novo contato para avaliar a reposição.",
  },
  negociacao: {
    data: "11/08/2026",
    titulo: "Negociação em andamento",
    descricao: "Oferta apresentada. Aguardando confirmação de retirada no CD.",
  },
  pedido: {
    data: "08/08/2026",
    titulo: "Pedido confirmado",
    descricao: "Pedido demonstrativo registrado. Acompanhar retirada no CD.",
  },
  indisponivel: {
    data: "06/08/2026",
    titulo: "Contato indisponível",
    descricao: "Não foi possível falar com o responsável pelo PDV.",
  },
};

export function historicoInicial(status: StatusContato): VisitaHistorico[] {
  switch (status) {
    case "Não contatado":
      return [];
    case "Retorno agendado":
      return [HISTORICO_BASE.retorno, HISTORICO_BASE.negociacao];
    case "Negociação em andamento":
      return [HISTORICO_BASE.negociacao, HISTORICO_BASE.retorno];
    case "Pedido confirmado":
      return [HISTORICO_BASE.pedido, HISTORICO_BASE.negociacao];
    case "Contato indisponível":
      return [HISTORICO_BASE.indisponivel];
    default:
      return [HISTORICO_BASE.indisponivel];
  }
}

export function farolDe(aderenciaCd: number): FarolAlpha {
  if (aderenciaCd === 0) return "Azul";
  if (aderenciaCd < 40) return "Vermelho";
  if (aderenciaCd < 70) return "Amarelo";
  return "Verde";
}

export const TEXTO_FAROL: Record<FarolAlpha, string> = {
  Azul: "Sem compra no CD",
  Vermelho: "Baixa aderência ao CD",
  Amarelo: "Aderência intermediária ao CD",
  Verde: "Alta aderência ao CD",
};

const ZS: CD = "CD Zona Sul — São Paulo";
const OS: CD = "CD Osasco";

type Row = [
  string,
  string,
  string,
  string,
  CD,
  number,
  number,
  number,
  number,
  number,
  Categoria,
  number,
  AcaoAlpha,
  Prioridade,
  StatusContato,
];

const ROWS: Row[] = [
  ["PDV-1001", "Residencial Parque Sul", "Marina Costa", "Vila Mariana", ZS, 3.2, 42800, 0, 0, 46, "Bebidas não alcoólicas", 382, "Ativar", "Muito alta", "Não contatado"],
  ["PDV-1002", "Condomínio Horizonte", "Rafael Nunes", "Saúde", ZS, 4.6, 35400, 4248, 12, 51, "Bebidas não alcoólicas", 341, "Ativar", "Muito alta", "Retorno agendado"],
  ["PDV-1003", "Edifício Vila das Flores", "Juliana Ramos", "Moema", ZS, 5.1, 28900, 7803, 27, 43, "Bomboniere", 298, "Ativar", "Alta", "Negociação em andamento"],
  ["PDV-1004", "Residencial Alto do Ipiranga", "Paulo Mendes", "Ipiranga", ZS, 6.8, 47600, 20468, 43, 38, "Bebidas alcoólicas", 455, "Ativar com ajuste de mix", "Alta", "Não contatado"],
  ["PDV-1005", "Condomínio Bosque Azul", "Fernanda Lima", "Jabaquara", ZS, 7.4, 24700, 17290, 70, 76, "Snacks", 251, "Defender", "Média", "Pedido confirmado"],
  ["PDV-1006", "Residencial Estação Sul", "Lucas Almeida", "Saúde", ZS, 8.2, 31300, 14085, 45, 49, "Bebidas não alcoólicas", 326, "Ativar com ajuste de mix", "Alta", "Não contatado"],
  ["PDV-1007", "Edifício Nova Aclimação", "Renata Souza", "Aclimação", ZS, 9.3, 19800, 15642, 79, 72, "Bomboniere", 214, "Defender", "Baixa", "Pedido confirmado"],
  ["PDV-1008", "Condomínio Vila do Sol", "André Martins", "Santo Amaro", ZS, 10.8, 44900, 8980, 20, 55, "Bebidas alcoólicas", 438, "Priorizar volume", "Média", "Retorno agendado"],
  ["PDV-1009", "Residencial Jardim Europa", "Camila Freitas", "Brooklin", ZS, 11.6, 38200, 28268, 74, 80, "Bebidas não alcoólicas", 365, "Monitorar", "Baixa", "Pedido confirmado"],
  ["PDV-1010", "Condomínio Pátio Paulista", "Thiago Oliveira", "Paraíso", ZS, 3.9, 16500, 0, 0, 41, "Snacks", 186, "Ativar", "Muito alta", "Não contatado"],
  ["PDV-1011", "Residencial Praça das Árvores", "Beatriz Gomes", "Vila Clementino", ZS, 5.7, 26400, 8712, 33, 47, "Bomboniere", 278, "Ativar", "Alta", "Não contatado"],
  ["PDV-1012", "Edifício Mirante do Sul", "Diego Rocha", "Campo Belo", ZS, 9.8, 49500, 25740, 52, 44, "Bebidas alcoólicas", 482, "Ativar com ajuste de mix", "Alta", "Negociação em andamento"],
  ["PDV-1013", "Condomínio Vila Nova Osasco", "Aline Barros", "Centro", OS, 2.8, 40600, 0, 0, 48, "Bebidas não alcoólicas", 391, "Ativar", "Muito alta", "Não contatado"],
  ["PDV-1014", "Residencial Parque Continental", "Gustavo Reis", "Jaguaré", OS, 4.1, 32800, 5248, 16, 53, "Snacks", 318, "Ativar", "Muito alta", "Retorno agendado"],
  ["PDV-1015", "Edifício Alto de Osasco", "Patrícia Silva", "Bela Vista", OS, 5.6, 22300, 10704, 48, 39, "Bomboniere", 234, "Ativar com ajuste de mix", "Alta", "Não contatado"],
  ["PDV-1016", "Condomínio Jardim das Nações", "Felipe Cardoso", "Vila Yara", OS, 6.3, 46700, 34091, 73, 78, "Bebidas não alcoólicas", 462, "Defender", "Média", "Pedido confirmado"],
  ["PDV-1017", "Residencial Portal do Oeste", "Simone Araujo", "Quitaúna", OS, 7.1, 18600, 5580, 30, 45, "Snacks", 197, "Ativar", "Alta", "Não contatado"],
  ["PDV-1018", "Condomínio Reserva Osasco", "Vinícius Lopes", "Umuarama", OS, 8.7, 36900, 18081, 49, 42, "Bebidas alcoólicas", 352, "Ativar com ajuste de mix", "Alta", "Negociação em andamento"],
  ["PDV-1019", "Edifício Nova Leopoldina", "Larissa Teixeira", "Presidente Altino", OS, 9.4, 29500, 23305, 79, 74, "Bebidas não alcoólicas", 287, "Defender", "Baixa", "Pedido confirmado"],
  ["PDV-1020", "Residencial Vale do Sol", "Marcelo Pinto", "Km 18", OS, 10.9, 45300, 9060, 20, 50, "Bebidas não alcoólicas", 441, "Priorizar volume", "Média", "Retorno agendado"],
  ["PDV-1021", "Condomínio Estação Oeste", "Natália Moraes", "Jaguaribe", OS, 11.8, 25900, 19943, 77, 81, "Bomboniere", 263, "Monitorar", "Baixa", "Pedido confirmado"],
  ["PDV-1022", "Residencial Vila Madalena", "Bruno Santos", "Vila Madalena", ZS, 12.4, 33700, 0, 0, 44, "Bebidas não alcoólicas", 337, "Priorizar volume", "Média", "Não contatado"],
  ["PDV-1023", "Edifício Campo Belo Prime", "Carolina Dias", "Campo Belo", ZS, 6.1, 21500, 3870, 18, 52, "Snacks", 221, "Ativar", "Alta", "Contato indisponível"],
  ["PDV-1024", "Condomínio Jardim da Saúde", "Ricardo Melo", "Saúde", ZS, 4.8, 37800, 24570, 65, 58, "Bebidas alcoólicas", 371, "Ativar com ajuste de mix", "Média", "Retorno agendado"],
  ["PDV-1025", "Residencial Nova Moema", "Daniela Castro", "Moema", ZS, 5.3, 30200, 22046, 73, 77, "Bomboniere", 305, "Defender", "Baixa", "Pedido confirmado"],
  ["PDV-1026", "Edifício Praça Osasco", "Eduardo Farias", "Centro", OS, 3.4, 15700, 0, 0, 36, "Snacks", 169, "Ativar", "Muito alta", "Não contatado"],
  ["PDV-1027", "Condomínio Bela Vista Oeste", "Isabela Duarte", "Bela Vista", OS, 5.2, 27600, 8280, 30, 46, "Bebidas não alcoólicas", 276, "Ativar", "Alta", "Negociação em andamento"],
  ["PDV-1028", "Residencial Parque dos Príncipes", "Henrique Vieira", "City Bussocaba", OS, 8.9, 41900, 19274, 46, 40, "Bebidas alcoólicas", 418, "Ativar com ajuste de mix", "Alta", "Não contatado"],
  ["PDV-1029", "Edifício Bosque Osasco", "Letícia Moura", "Vila Campesina", OS, 9.7, 20400, 15912, 78, 75, "Bomboniere", 208, "Defender", "Baixa", "Pedido confirmado"],
  ["PDV-1030", "Condomínio Nova Aurora", "Sérgio Barros", "Rochdale", OS, 12.7, 48800, 9760, 20, 47, "Bebidas não alcoólicas", 497, "Priorizar volume", "Média", "Retorno agendado"],
];

const ULTIMO_CONTATO: Record<StatusContato, string | null> = {
  "Não contatado": null,
  "Retorno agendado": "14/08/2026",
  "Negociação em andamento": "11/08/2026",
  "Pedido confirmado": "08/08/2026",
  "Contato indisponível": "06/08/2026",
  "Sem interesse": "06/08/2026",
};

export const PDVS_INICIAIS: Pdv[] = ROWS.map((r) => ({
  id: r[0],
  nome: r[1],
  franqueado: r[2],
  bairro: r[3],
  cd: r[4],
  distanciaKm: r[5],
  faturamento: r[6],
  sellIn: r[7],
  aderenciaCd: r[8],
  aderenciaMix: r[9],
  categoria: r[10],
  skus: r[11],
  acao: r[12],
  prioridade: r[13],
  status: r[14],
  ultimoContato: ULTIMO_CONTATO[r[14]],
}));

export const ROTA_DO_DIA_IDS = [
  "PDV-1001",
  "PDV-1013",
  "PDV-1010",
  "PDV-1026",
  "PDV-1002",
  "PDV-1014",
  "PDV-1003",
  "PDV-1011",
  "PDV-1017",
  "PDV-1004",
  "PDV-1015",
  "PDV-1027",
];

export const NEGOCIACOES_INICIAIS: Negociacao[] = [
  {
    id: "NG-2001",
    pdvId: "PDV-1003",
    cd: ZS,
    oferta: "Combo Bomboniere Estratégica",
    valor: 2480,
    dataRetirada: "20/08/2026",
    status: "Em negociação",
    observacao: "Franqueado avalia reposição de bomboniere para o fim do mês.",
    itens: "Bomboniere",
  },
  {
    id: "NG-2002",
    pdvId: "PDV-1012",
    cd: ZS,
    oferta: "Combo Geladeira Completa",
    valor: 4120,
    dataRetirada: "21/08/2026",
    status: "Promessa registrada",
    observacao: "Promessa de retirada com ajuste de mix de bebidas.",
    itens: "Bebidas alcoólicas e não alcoólicas",
  },
  {
    id: "NG-2003",
    pdvId: "PDV-1018",
    cd: OS,
    oferta: "Combo Giro Rápido",
    valor: 3260,
    dataRetirada: "21/08/2026",
    status: "Em negociação",
    observacao: "Aguardando confirmação do franqueado sobre volume inicial.",
    itens: "Bebidas não alcoólicas",
  },
  {
    id: "NG-2004",
    pdvId: "PDV-1027",
    cd: OS,
    oferta: "Combo Reposição Essencial",
    valor: 1880,
    dataRetirada: "22/08/2026",
    status: "Promessa registrada",
    observacao: "Promessa de primeiro pedido após validação de preços.",
    itens: "Bebidas não alcoólicas e snacks",
  },
  {
    id: "NG-2005",
    pdvId: "PDV-1002",
    cd: ZS,
    oferta: "Combo Giro Rápido",
    valor: 2140,
    dataRetirada: "24/08/2026",
    status: "Em negociação",
    observacao: "Retorno previsto hoje para fechar condição.",
    itens: "Bebidas não alcoólicas",
  },
  {
    id: "NG-2006",
    pdvId: "PDV-1014",
    cd: OS,
    oferta: "Combo Snacks de Alto Giro",
    valor: 1560,
    dataRetirada: "25/08/2026",
    status: "Promessa registrada",
    observacao: "Franqueado pediu proposta com foco em snacks.",
    itens: "Snacks",
  },
  {
    id: "NG-2007",
    pdvId: "PDV-1024",
    cd: ZS,
    oferta: "Ação Mix Inteligente",
    valor: 3020,
    dataRetirada: "26/08/2026",
    status: "Promessa registrada",
    observacao: "Substituição de itens fora do CD em avaliação.",
    itens: "Mix",
  },
  {
    id: "NG-2008",
    pdvId: "PDV-1005",
    cd: ZS,
    oferta: "Combo Snacks de Alto Giro",
    valor: 1740,
    dataRetirada: "19/08/2026",
    status: "Pedido confirmado",
    observacao: "Pedido demonstrativo confirmado. Retirada programada.",
    itens: "Snacks",
  },
  {
    id: "NG-2009",
    pdvId: "PDV-1016",
    cd: OS,
    oferta: "Combo Giro Rápido",
    valor: 2960,
    dataRetirada: "19/08/2026",
    status: "Pedido confirmado",
    observacao: "Reposição recorrente mantida no CD recomendado.",
    itens: "Bebidas não alcoólicas",
  },
  {
    id: "NG-2010",
    pdvId: "PDV-1025",
    cd: ZS,
    oferta: "Combo Bomboniere Estratégica",
    valor: 1420,
    dataRetirada: "20/08/2026",
    status: "Pedido confirmado",
    observacao: "Pedido demonstrativo confirmado com foco em bomboniere.",
    itens: "Bomboniere",
  },
];

export const METAS_CARTEIRA = [
  { indicador: "PDVs sem compra no CD", atual: "8", meta: "5", progresso: 62, texto: "3 ativações necessárias" },
  { indicador: "Participação do CD nas compras", atual: "46%", meta: "52%", progresso: 88, texto: "Evolução de 4 p.p. no mês" },
  { indicador: "Aderência de mix ao CD", atual: "58%", meta: "64%", progresso: 90, texto: "6 p.p. para a meta" },
  { indicador: "Sell-in da carteira", atual: "R$ 612.400", meta: "R$ 700.000", progresso: 87, texto: "87% da meta mensal" },
];

export const METAS_ATIVIDADE = [
  { indicador: "Contatos realizados", atual: 38, meta: 45 },
  { indicador: "Retornos agendados", atual: 9, meta: 12 },
  { indicador: "Negociações em andamento", atual: 7, meta: 10 },
  { indicador: "Pedidos confirmados", atual: 6, meta: 8 },
];

export const ORDEM_PRIORIDADE: Record<Prioridade, number> = {
  "Muito alta": 0,
  Alta: 1,
  Média: 2,
  Baixa: 3,
};

export function moeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function km(valor: number): string {
  return `${valor.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km`;
}
