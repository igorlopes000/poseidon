# Poseidon Sales Hub

```md

# PROMPT PARA LOVABLE — POSEIDON: CENTRAL DE VENDAS

Crie uma aplicação web **front-end, navegável e não funcional** chamada:

# Poseidon — Central de Vendas

O sistema é um mockup operacional para demonstrar a rotina de um vendedor remoto da Market4U que atua na expansão das compras dos franqueados pelos Centros de Distribuição (CDs).

O objetivo do produto é tornar demonstrável, para Diretoria Comercial e envolvidos no piloto, o fluxo completo:

```text

Analisar desempenho e prioridades

→ acessar a rota do dia

→ abrir o contexto de um PDV

→ entender a recomendação e a oportunidade comercial

→ registrar resultado do contato

→ registrar negociação ou promessa

→ consolidar negociações

→ simular o envio de relatório ao ponto focal do CD

```

---

# 1. RESTRIÇÕES ABSOLUTAS

## 1.1 Natureza do projeto

Este projeto é um **mockup navegável**, não um sistema produtivo.

Implementar somente:

- front-end;

- navegação entre páginas;

- estado local;

- dados mockados;

- filtros e buscas locais;

- modais, drawers, toasts e interações visuais.

## 1.2 Não implementar

Não criar, configurar, sugerir nem conectar:

- Supabase;

- banco de dados;

- autenticação;

- login;

- cadastro de usuários;

- backend;

- API;

- edge functions;

- webhooks;

- integrações com Google Sheets;

- integrações com Market4U;

- integrações com Alpha;

- integração de e-mail;

- integração de WhatsApp;

- upload de arquivo;

- exportação real;

- automações;

- persistência fora do estado local.

Ao atualizar a página, o estado deve retornar aos dados iniciais mockados.

## 1.3 Stack

Use o stack padrão do Lovable:

- React;

- TypeScript;

- Tailwind CSS;

- componentes modernos e acessíveis;

- React Router para rotas;

- Lucide Icons para ícones.

Não use bibliotecas ou serviços externos desnecessários.

## 1.4 Conteúdo

Todo conteúdo textual visível deve estar em **pt-BR**.

Não usar:

- Lorem ipsum;

- textos em inglês;

- nomes genéricos como “John Doe”;

- métricas genéricas como “Revenue”;

- placeholders de conteúdo;

- emojis;

- tom informal ou publicitário.

Não criar conteúdo de negócio adicional além do que está especificado neste prompt.

---

# 2. IDENTIDADE VISUAL

## 2.1 Referência de marca

Usar como referência visual a identidade pública da Market4U:

```text

https://market4u.com.br/

```

Objetivo visual:

- ambiente corporativo;

- ferramenta interna formal;

- interface operacional;

- aparência confiável e madura;

- linguagem visual coerente com a Market4U.

## 2.2 Logo e marca

No topo da sidebar, exibir:

```text

[logo oficial Market4U, se disponível]

Poseidon

Central de Vendas

```

Se o logo oficial não puder ser obtido com segurança, usar somente:

```text

market4u

Poseidon

Central de Vendas

```

Não recriar, desenhar ou improvisar um símbolo de logo.

## 2.3 Paleta

Primeiro, usar as cores observáveis no site público da Market4U.

Caso não seja possível identificar tokens oficiais, usar esta paleta de fallback:

```text

Verde primário: #00A859

Verde escuro: #006B3F

Verde claro: #E7F6EC

Grafite: #1E2933

Cinza escuro: #475569

Cinza médio: #94A3B8

Cinza claro: #E2E8F0

Fundo da aplicação: #F7F9FA

Branco: #FFFFFF

Atenção: #D99A00

Erro operacional: #C62828

Informação: #2563EB

```

## 2.4 Tipografia

Usar a tipografia observável no site da Market4U.

Na impossibilidade de identificá-la, usar:

```text

Inter

```

Regras:

- títulos: semibold;

- métricas: semibold ou bold;

- textos operacionais: regular;

- tabelas: alta legibilidade;

- não usar tipografia decorativa;

- não usar fontes serifadas.

## 2.5 Estilo

A interface deve ser:

- desktop-first;

- responsiva em nível básico;

- formal;

- limpa;

- densa sem ficar confusa;

- adequada para um vendedor com ensino médio;

- orientada à próxima ação;

- sem fórmulas e sem lógica algorítmica exposta.

Não usar:

- gradientes chamativos;

- neon;

- excesso de sombras;

- cards enormes;

- ilustrações genéricas;

- visual de landing page;

- gráficos decorativos sem decisão operacional associada;

- elementos com aparência de rede social;

- estética de CRM genérico colorido demais.

---

# 3. PRINCÍPIOS OPERACIONAIS

## 3.1 Público

O usuário é um vendedor remoto do piloto de Vendas Internas.

Ele precisa entender rapidamente:

1. quais PDVs priorizar;

2. por que priorizá-los;

3. qual ação comercial tomar;

4. qual CD recomendar;

5. quais ofertas estão liberadas;

6. qual retorno registrar;

7. quais negociações precisam ser reportadas.

## 3.2 Linguagem

Usar os termos abaixo de forma consistente:

| Usar | Não usar |

|---|---|

| PDV | Loja, cliente, unidade |

| Franqueado | Cliente |

| CD | Depósito, centro logístico |

| Sell-in | Receita, revenue |

| Aderência ao CD | Penetração, score |

| Aderência de mix | Score de produtos |

| Recomendação Alpha | Algoritmo, IA |

| Rota do dia | Pipeline |

| Negociação | Deal |

| Retorno agendado | Follow-up |

| Pedido confirmado | Conversão fechada |

## 3.3 Regra de simplicidade

Exibir indicadores sem fórmulas.

Exemplos corretos:

```text

Aderência ao CD: 38%

Distância até o CD: 7,4 km

Oportunidade de mix: 12 SKUs com substituto disponível

Próxima ação: Oferecer combo de bebidas não alcoólicas

```

Não exibir:

```text

Percentil 70

Clusterização

Regra 8 da matriz

Modelo de priorização

Cálculo de ranking

Fórmulas de aderência

```

---

# 4. CORES ALPHA E AÇÕES ALPHA

## 4.1 Farol Alpha: cor representa aderência ao CD

A cor representa exclusivamente o nível de aderência do PDV ao CD.

| Cor | Nome | Regra visual | Texto complementar obrigatório |

|---|---|---|---|

| Azul | Sem compra | 0% de aderência | Sem compra no CD |

| Vermelho | Aderência baixa | 1% a 39% | Baixa aderência ao CD |

| Amarelo | Aderência intermediária | 40% a 69% | Aderência intermediária ao CD |

| Verde | Aderência alta | 70% ou mais | Alta aderência ao CD |

Sempre mostrar **cor + texto**. Nunca depender só da cor.

## 4.2 Ações Alpha: ação representa o que o vendedor deve fazer

A ação é independente da cor.

Usar apenas estas cinco ações:

```text

Ativar

Ativar com ajuste de mix

Defender

Priorizar volume

Monitorar

```

Cada PDV deve exibir:

```text

Farol Alpha: [cor + texto]

Recomendação Alpha: [ação]

Prioridade: [Muito alta / Alta / Média / Baixa]

```

---

# 5. ESTRUTURA DE NAVEGAÇÃO

Criar estas rotas:

```text

/

 /rota-do-dia

 /pdvs

 /pdvs/:pdvId

 /negociacoes

 /metas

```

Criar sidebar fixa com:

```text

Visão geral

Rota do dia

PDVs

Negociações

Metas e desempenho

```

Usar ícones discretos.

O item ativo deve estar claramente destacado.

No rodapé da sidebar, exibir:

```text

Ambiente demonstrativo

Dados mockados

```

---

# 6. DADOS MOCKADOS

## 6.1 Data de referência

Usar a data demonstrativa:

```text

18 de agosto de 2026

```

Exibir no cabeçalho:

```text

Dados demonstrativos atualizados hoje às 08:00

```

## 6.2 CDs

Usar apenas:

```text

CD Zona Sul — São Paulo

CD Osasco

```

## 6.3 Ofertas demonstrativas

Criar este catálogo fixo de ofertas. Exibir sempre a observação:

```text

Condição demonstrativa sujeita à validação comercial.

```

| ID | Nome | Condição | Foco | Validade |

|---|---|---|---|---|

| OF-01 | Combo Giro Rápido | 12 caixas mistas com condição comercial demonstrativa | Bebidas não alcoólicas | 31/08/2026 |

| OF-02 | Combo Reposição Essencial | 8 caixas com itens de alto giro | Bebidas não alcoólicas e snacks | 31/08/2026 |

| OF-03 | Combo Bomboniere Estratégica | Mix de itens de bomboniere para reposição | Bomboniere | 31/08/2026 |

| OF-04 | Combo Snacks de Alto Giro | Reposição de snacks para ponto de venda | Snacks | 31/08/2026 |

| OF-05 | Combo Geladeira Completa | Mix de bebidas alcoólicas e não alcoólicas | Bebidas | 31/08/2026 |

| OF-06 | Ação Mix Inteligente | Substituição de itens fora do CD por equivalentes disponíveis | Mix | 31/08/2026 |

## 6.4 PDVs

Criar exatamente 30 PDVs com os dados abaixo.

| ID | PDV | Franqueado | Bairro | CD | Distância | Faturamento | Sell-in CD | Aderência CD | Aderência mix | Categoria dominante | SKUs | Farol | Ação | Prioridade | Status |

|---|---|---|---|---|---:|---:|---:|---:|---:|---|---:|---|---|---|---|

| PDV-1001 | Residencial Parque Sul | Marina Costa | Vila Mariana | CD Zona Sul — São Paulo | 3,2 km | R$ 42.800 | R$ 0 | 0% | 46% | Bebidas não alcoólicas | 382 | Azul | Ativar | Muito alta | Não contatado |

| PDV-1002 | Condomínio Horizonte | Rafael Nunes | Saúde | CD Zona Sul — São Paulo | 4,6 km | R$ 35.400 | R$ 4.248 | 12% | 51% | Bebidas não alcoólicas | 341 | Vermelho | Ativar | Muito alta | Retorno agendado |

| PDV-1003 | Edifício Vila das Flores | Juliana Ramos | Moema | CD Zona Sul — São Paulo | 5,1 km | R$ 28.900 | R$ 7.803 | 27% | 43% | Bomboniere | 298 | Vermelho | Ativar | Alta | Negociação em andamento |

| PDV-1004 | Residencial Alto do Ipiranga | Paulo Mendes | Ipiranga | CD Zona Sul — São Paulo | 6,8 km | R$ 47.600 | R$ 20.468 | 43% | 38% | Bebidas alcoólicas | 455 | Amarelo | Ativar com ajuste de mix | Alta | Não contatado |

| PDV-1005 | Condomínio Bosque Azul | Fernanda Lima | Jabaquara | CD Zona Sul — São Paulo | 7,4 km | R$ 24.700 | R$ 17.290 | 70% | 76% | Snacks | 251 | Verde | Defender | Média | Pedido confirmado |

| PDV-1006 | Residencial Estação Sul | Lucas Almeida | Saúde | CD Zona Sul — São Paulo | 8,2 km | R$ 31.300 | R$ 14.085 | 45% | 49% | Bebidas não alcoólicas | 326 | Amarelo | Ativar com ajuste de mix | Alta | Não contatado |

| PDV-1007 | Edifício Nova Aclimação | Renata Souza | Aclimação | CD Zona Sul — São Paulo | 9,3 km | R$ 19.800 | R$ 15.642 | 79% | 72% | Bomboniere | 214 | Verde | Defender | Baixa | Pedido confirmado |

| PDV-1008 | Condomínio Vila do Sol | André Martins | Santo Amaro | CD Zona Sul — São Paulo | 10,8 km | R$ 44.900 | R$ 8.980 | 20% | 55% | Bebidas alcoólicas | 438 | Vermelho | Priorizar volume | Média | Retorno agendado |

| PDV-1009 | Residencial Jardim Europa | Camila Freitas | Brooklin | CD Zona Sul — São Paulo | 11,6 km | R$ 38.200 | R$ 28.268 | 74% | 80% | Bebidas não alcoólicas | 365 | Verde | Monitorar | Baixa | Pedido confirmado |

| PDV-1010 | Condomínio Pátio Paulista | Thiago Oliveira | Paraíso | CD Zona Sul — São Paulo | 3,9 km | R$ 16.500 | R$ 0 | 0% | 41% | Snacks | 186 | Azul | Ativar | Muito alta | Não contatado |

| PDV-1011 | Residencial Praça das Árvores | Beatriz Gomes | Vila Clementino | CD Zona Sul — São Paulo | 5,7 km | R$ 26.400 | R$ 8.712 | 33% | 47% | Bomboniere | 278 | Vermelho | Ativar | Alta | Não contatado |

| PDV-1012 | Edifício Mirante do Sul | Diego Rocha | Campo Belo | CD Zona Sul — São Paulo | 9,8 km | R$ 49.500 | R$ 25.740 | 52% | 44% | Bebidas alcoólicas | 482 | Amarelo | Ativar com ajuste de mix | Alta | Negociação em andamento |

| PDV-1013 | Condomínio Vila Nova Osasco | Aline Barros | Centro | CD Osasco | 2,8 km | R$ 40.600 | R$ 0 | 0% | 48% | Bebidas não alcoólicas | 391 | Azul | Ativar | Muito alta | Não contatado |

| PDV-1014 | Residencial Parque Continental | Gustavo Reis | Jaguaré | CD Osasco | 4,1 km | R$ 32.800 | R$ 5.248 | 16% | 53% | Snacks | 318 | Vermelho | Ativar | Muito alta | Retorno agendado |

| PDV-1015 | Edifício Alto de Osasco | Patrícia Silva | Bela Vista | CD Osasco | 5,6 km | R$ 22.300 | R$ 10.704 | 48% | 39% | Bomboniere | 234 | Amarelo | Ativar com ajuste de mix | Alta | Não contatado |

| PDV-1016 | Condomínio Jardim das Nações | Felipe Cardoso | Vila Yara | CD Osasco | 6,3 km | R$ 46.700 | R$ 34.091 | 73% | 78% | Bebidas não alcoólicas | 462 | Verde | Defender | Média | Pedido confirmado |

| PDV-1017 | Residencial Portal do Oeste | Simone Araujo | Quitaúna | CD Osasco | 7,1 km | R$ 18.600 | R$ 5.580 | 30% | 45% | Snacks | 197 | Vermelho | Ativar | Alta | Não contatado |

| PDV-1018 | Condomínio Reserva Osasco | Vinícius Lopes | Umuarama | CD Osasco | 8,7 km | R$ 36.900 | R$ 18.081 | 49% | 42% | Bebidas alcoólicas | 352 | Amarelo | Ativar com ajuste de mix | Alta | Negociação em andamento |

| PDV-1019 | Edifício Nova Leopoldina | Larissa Teixeira | Presidente Altino | CD Osasco | 9,4 km | R$ 29.500 | R$ 23.305 | 79% | 74% | Bebidas não alcoólicas | 287 | Verde | Defender | Baixa | Pedido confirmado |

| PDV-1020 | Residencial Vale do Sol | Marcelo Pinto | Km 18 | CD Osasco | 10,9 km | R$ 45.300 | R$ 9.060 | 20% | 50% | Bebidas não alcoólicas | 441 | Vermelho | Priorizar volume | Média | Retorno agendado |

| PDV-1021 | Condomínio Estação Oeste | Natália Moraes | Jaguaribe | CD Osasco | 11,8 km | R$ 25.900 | R$ 19.943 | 77% | 81% | Bomboniere | 263 | Verde | Monitorar | Baixa | Pedido confirmado |

| PDV-1022 | Residencial Vila Madalena | Bruno Santos | Vila Madalena | CD Zona Sul — São Paulo | 12,4 km | R$ 33.700 | R$ 0 | 0% | 44% | Bebidas não alcoólicas | 337 | Azul | Priorizar volume | Média | Não contatado |

| PDV-1023 | Edifício Campo Belo Prime | Carolina Dias | Campo Belo | CD Zona Sul — São Paulo | 6,1 km | R$ 21.500 | R$ 3.870 | 18% | 52% | Snacks | 221 | Vermelho | Ativar | Alta | Contato indisponível |

| PDV-1024 | Condomínio Jardim da Saúde | Ricardo Melo | Saúde | CD Zona Sul — São Paulo | 4,8 km | R$ 37.800 | R$ 24.570 | 65% | 58% | Bebidas alcoólicas | 371 | Amarelo | Ativar com ajuste de mix | Média | Retorno agendado |

| PDV-1025 | Residencial Nova Moema | Daniela Castro | Moema | CD Zona Sul — São Paulo | 5,3 km | R$ 30.200 | R$ 22.046 | 73% | 77% | Bomboniere | 305 | Verde | Defender | Baixa | Pedido confirmado |

| PDV-1026 | Edifício Praça Osasco | Eduardo Farias | Centro | CD Osasco | 3,4 km | R$ 15.700 | R$ 0 | 0% | 36% | Snacks | 169 | Azul | Ativar | Muito alta | Não contatado |

| PDV-1027 | Condomínio Bela Vista Oeste | Isabela Duarte | Bela Vista | CD Osasco | 5,2 km | R$ 27.600 | R$ 8.280 | 30% | 46% | Bebidas não alcoólicas | 276 | Vermelho | Ativar | Alta | Negociação em andamento |

| PDV-1028 | Residencial Parque dos Príncipes | Henrique Vieira | City Bussocaba | CD Osasco | 8,9 km | R$ 41.900 | R$ 19.274 | 46% | 40% | Bebidas alcoólicas | 418 | Amarelo | Ativar com ajuste de mix | Alta | Não contatado |

| PDV-1029 | Edifício Bosque Osasco | Letícia Moura | Vila Campesina | CD Osasco | 9,7 km | R$ 20.400 | R$ 15.912 | 78% | 75% | Bomboniere | 208 | Verde | Defender | Baixa | Pedido confirmado |

| PDV-1030 | Condomínio Nova Aurora | Sérgio Barros | Rochdale | CD Osasco | 12,7 km | R$ 48.800 | R$ 9.760 | 20% | 47% | Bebidas não alcoólicas | 497 | Vermelho | Priorizar volume | Média | Retorno agendado |

## 6.5 Textos de oportunidade

Usar estes textos conforme a ação Alpha:

| Ação Alpha | Texto de oportunidade |

|---|---|

| Ativar | Oportunidade de ativar compras recorrentes no CD recomendado. |

| Ativar com ajuste de mix | Oportunidade de ampliar compras no CD com substituição de itens fora do portfólio. |

| Defender | PDV com boa aderência. Prioridade é preservar volume e evitar perda de participação do CD. |

| Priorizar volume | PDV de alto faturamento com baixa participação do CD. Avaliar oportunidade mesmo fora do raio ideal. |

| Monitorar | PDV com aderência alta fora do raio ideal. Manter acompanhamento sem priorizar contato imediato. |

## 6.6 Sugestões de substituição de mix

Exibir no máximo três sugestões por PDV com ação `Ativar com ajuste de mix`.

Usar conforme categoria dominante:

### Bebidas não alcoólicas

```text

Produto atual: Refrigerante 2 L fora do CD

Substituto disponível: Refrigerante 2 L disponível no CD

Categoria: Bebidas não alcoólicas

Oportunidade: Reposição de alto giro com retirada no CD recomendado

```

```text

Produto atual: Suco pronto 1 L fora do CD

Substituto disponível: Suco pronto 1 L disponível no CD

Categoria: Bebidas não alcoólicas

Oportunidade: Substituição de mix para ampliar aderência

```

```text

Produto atual: Água saborizada 500 ml fora do CD

Substituto disponível: Água saborizada 500 ml disponível no CD

Categoria: Bebidas não alcoólicas

Oportunidade: Complementar pedido com item de giro recorrente

```

### Bebidas alcoólicas

```text

Produto atual: Cerveja lata fora do CD

Substituto disponível: Cerveja lata disponível no CD

Categoria: Bebidas alcoólicas

Oportunidade: Reposição de geladeira com item disponível no CD

```

```text

Produto atual: Cerveja long neck fora do CD

Substituto disponível: Cerveja long neck disponível no CD

Categoria: Bebidas alcoólicas

Oportunidade: Substituição de mix para reduzir compra fora do CD

```

```text

Produto atual: Bebida pronta para consumo fora do CD

Substituto disponível: Bebida pronta para consumo disponível no CD

Categoria: Bebidas alcoólicas

Oportunidade: Complementar mix de alto giro

```

### Bomboniere

```text

Produto atual: Chocolate em barra fora do CD

Substituto disponível: Chocolate em barra disponível no CD

Categoria: Bomboniere

Oportunidade: Reposição com item equivalente disponível

```

```text

Produto atual: Bombom sortido fora do CD

Substituto disponível: Bombom sortido disponível no CD

Categoria: Bomboniere

Oportunidade: Reposição de ponto de venda com mix disponível

```

```text

Produto atual: Bala e goma fora do CD

Substituto disponível: Bala e goma disponível no CD

Categoria: Bomboniere

Oportunidade: Ampliar aderência com itens de giro frequente

```

### Snacks

```text

Produto atual: Salgadinho 45 g fora do CD

Substituto disponível: Salgadinho 45 g disponível no CD

Categoria: Snacks

Oportunidade: Reposição de alto giro com retirada no CD

```

```text

Produto atual: Biscoito recheado fora do CD

Substituto disponível: Biscoito recheado disponível no CD

Categoria: Snacks

Oportunidade: Substituição de mix com item disponível no CD

```

```text

Produto atual: Amendoim 100 g fora do CD

Substituto disponível: Amendoim 100 g disponível no CD

Categoria: Snacks

Oportunidade: Complementar pedido para ampliar participação do CD

```

---

# 7. TELAS

## 7.1 Visão geral — rota `/`

### Cabeçalho

Exibir:

```text

Visão geral

18 de agosto de 2026

Dados demonstrativos atualizados hoje às 08:00

```

À direita:

```text

Vendedor responsável

Carlos Henrique

```

### Cards superiores

Exibir estes quatro cards:

| Título | Valor | Texto auxiliar |

|---|---:|---|

| PDVs previstos hoje | 12 | 5 contatos concluídos |

| Contatos realizados na semana | 38 | Meta semanal: 45 contatos |

| Negociações pendentes | 7 | 3 com retorno previsto hoje |

| Volume estimado em negociação | R$ 18.460 | Dados demonstrativos |

### Seção: Metas do mês

Título:

```text

Metas do mês

```

Exibir quatro cards com barra de progresso:

| Métrica | Atual | Meta | Texto |

|---|---:|---:|---|

| PDVs sem compra no CD | 8 | Reduzir para 5 | 3 ativações necessárias |

| Participação do CD nas compras | 46% | 52% | Evolução de 4 p.p. no mês |

| Aderência de mix ao CD | 58% | 64% | 6 p.p. para a meta |

| Sell-in da carteira | R$ 612.400 | R$ 700.000 | 87% da meta mensal |

### Seção: Rota de hoje

Título:

```text

Rota de hoje

```

Exibir seis PDVs, nesta ordem:

```text

1. PDV-1001 — Residencial Parque Sul

2. PDV-1013 — Condomínio Vila Nova Osasco

3. PDV-1010 — Condomínio Pátio Paulista

4. PDV-1026 — Edifício Praça Osasco

5. PDV-1002 — Condomínio Horizonte

6. PDV-1014 — Residencial Parque Continental

```

Cada linha deve mostrar:

```text

ordem

nome do PDV

farol Alpha

recomendação Alpha

prioridade

status

botão: Ver PDV

```

CTA:

```text

Ver rota completa

```

### Seção: Atenção hoje

Exibir exatamente estes itens:

```text

3 retornos agendados para hoje

2 negociações com retirada prevista nesta semana

4 PDVs de prioridade muito alta sem contato registrado

```

### Seção: Negociações do dia

Exibir três negociações resumidas e CTA:

```text

Ver negociações

```

---

## 7.2 Rota do dia — rota `/rota-do-dia`

Título:

```text

Rota do dia

```

Subtítulo:

```text

Prioridades comerciais para 18 de agosto de 2026

```

Exibir:

```text

12 PDVs previstos

5 contatos concluídos

7 contatos pendentes

```

Criar filtros locais:

```text

Todos

Prioridade

Recomendação Alpha

Status de contato

CD recomendado

```

Criar botão:

```text

Próximo PDV

```

Esse botão deve abrir o primeiro PDV de prioridade mais alta ainda não concluído.

Criar tabela com colunas:

```text

Ordem

PDV

CD recomendado

Distância

Farol Alpha

Recomendação Alpha

Prioridade

Oportunidade

Status

Ação

```

A coluna `Ação` deve conter:

```text

Ver PDV

```

---

## 7.3 PDVs — rota `/pdvs`

Título:

```text

PDVs

```

Subtítulo:

```text

30 PDVs na carteira demonstrativa

```

Criar busca local com placeholder:

```text

Buscar por PDV, ID, bairro ou franqueado

```

Criar filtros locais:

```text

Recomendação Alpha

Prioridade

Status de contato

CD recomendado

Aderência ao CD

Raio de distância

```

Criar ordenação local:

```text

Prioridade

Faturamento mensal

Aderência ao CD

Distância

Último contato

```

Criar tabela com:

```text

PDV

CD recomendado

Faturamento mensal

Aderência ao CD

Aderência de mix

Distância

Recomendação Alpha

Prioridade

Último contato

Status

Ação

```

Ação:

```text

Ver detalhe

```

---

## 7.4 Detalhe do PDV — rota `/pdvs/:pdvId`

Criar breadcrumb:

```text

PDVs / [Nome do PDV]

```

No caso de entrada vinda da rota do dia:

```text

Rota do dia / [Nome do PDV]

```

### Cabeçalho

Exibir:

```text

[Nome do PDV]

[ID do PDV]

Franqueado: [Nome do franqueado]

[Bairro] — São Paulo

```

No lado direito:

```text

Status: [Status de contato]

CD recomendado: [Nome do CD]

```

### Bloco prioritário

Exibir com destaque:

```text

Recomendação Alpha

[Ação Alpha]

Prioridade: [Prioridade]

[Texto de oportunidade correspondente à ação]

```

Exemplo obrigatório para PDV-1001:

```text

Recomendação Alpha

Ativar

Prioridade: Muito alta

Oportunidade de ativar compras recorrentes no CD recomendado.

```

### Indicadores

Exibir seis cards:

```text

Faturamento mensal total

Sell-in via CD

Aderência ao CD

Aderência de mix

Distância até o CD

Próxima ação

```

Texto de `Próxima ação`:

| Ação | Próxima ação |

|---|---|

| Ativar | Apresentar o CD recomendado e identificar oportunidade de primeiro pedido. |

| Ativar com ajuste de mix | Apresentar substitutos disponíveis no CD e oferecer combo de reposição. |

| Defender | Validar satisfação, preservar compra recorrente e identificar risco de perda de volume. |

| Priorizar volume | Avaliar oportunidade de volume e viabilidade de retirada no CD recomendado. |

| Monitorar | Acompanhar comportamento de compra e manter disponibilidade para retorno. |

### Seção: Contexto do PDV

Título:

```text

Contexto do PDV

```

Exibir:

```text

Categoria dominante: [Categoria]

SKUs ativos estimados: [Quantidade]

Último contato: [Data ou “Sem contato registrado”]

Próximo passo: [Texto conforme status]

```

Mapeamento de próximo passo:

| Status | Próximo passo |

|---|---|

| Não contatado | Realizar primeiro contato comercial. |

| Retorno agendado | Retornar na data combinada e validar interesse. |

| Negociação em andamento | Atualizar condição comercial e confirmar retirada. |

| Pedido confirmado | Acompanhar retirada e preparar próxima reposição. |

| Contato indisponível | Tentar novo contato em outro horário. |

| Sem interesse | Registrar motivo e manter acompanhamento futuro. |

### Seção: Oportunidade de mix

Exibir somente para PDVs com ação:

```text

Ativar com ajuste de mix

```

Título:

```text

Oportunidade de mix

```

Subtítulo:

```text

Itens fora do portfólio atual do CD com substitutos disponíveis.

```

Exibir as três sugestões de substituição correspondentes à categoria dominante.

Para os demais PDVs, exibir:

```text

Não há sugestão prioritária de substituição de mix para este momento.

```

### Seção: Ofertas e combos liberados

Título:

```text

Ofertas e combos liberados

```

Exibir três cards de oferta adequados à categoria dominante.

Cada card deve conter:

```text

Nome da oferta

Condição

Foco

Validade

Condição demonstrativa sujeita à validação comercial.

Botão: Adicionar à negociação

```

Ao clicar em `Adicionar à negociação`, abrir o drawer de negociação com a oferta já selecionada.

### Seção: Histórico de visitas

Título:

```text

Histórico de visitas

```

Para PDVs com status `Não contatado`, exibir:

```text

Nenhum contato registrado.

```

Para os demais, exibir entre uma e três entradas usando somente estes textos:

```text

14/08/2026 — Retorno agendado

Franqueado solicitou novo contato para avaliar a reposição.

11/08/2026 — Negociação em andamento

Oferta apresentada. Aguardando confirmação de retirada no CD.

08/08/2026 — Pedido confirmado

Pedido demonstrativo registrado. Acompanhar retirada no CD.

06/08/2026 — Contato indisponível

Não foi possível falar com o responsável pelo PDV.

```

### Ações principais

Exibir botões:

```text

Registrar resultado

Registrar negociação

```

---

## 7.5 Drawer: Registrar resultado

Abrir drawer lateral direito.

Título:

```text

Registrar resultado do contato

```

Subtítulo:

```text

[Nome do PDV] — [ID do PDV]

```

Campos:

```text

Resultado do contato

Resumo do contato

Próximo passo

Data de retorno

Valor estimado do pedido

Data prevista de retirada

```

Opções de `Resultado do contato`:

```text

Pedido confirmado

Interesse com retorno agendado

Negociação em andamento

Sem interesse

Não contatado

Contato inválido ou indisponível

```

Regras:

- `Pedido confirmado`: mostrar `Valor estimado do pedido` e `Data prevista de retirada`.

- `Interesse com retorno agendado`: mostrar `Data de retorno`.

- `Negociação em andamento`: mostrar CTA secundário `Registrar negociação`.

- demais resultados: esconder campos condicionais.

Botões:

```text

Cancelar

Salvar resultado

```

Após salvar:

1. fechar drawer;

2. atualizar localmente o status do PDV;

3. adicionar entrada ao histórico;

4. atualizar contadores relacionados;

5. mostrar toast:

```text

Resultado registrado com sucesso.

```

---

## 7.6 Drawer: Registrar negociação

Abrir drawer lateral direito.

Título:

```text

Registrar negociação

```

Subtítulo:

```text

[Nome do PDV] — [ID do PDV]

```

Campos:

```text

Oferta ou combo

CD de retirada

Valor estimado

Data prevista de retirada

Itens ou categorias envolvidos

Observação

Status

```

Opções de `Status`:

```text

Em negociação

Promessa registrada

Pedido confirmado

Cancelada

```

Botões:

```text

Cancelar

Salvar negociação

```

Ao salvar:

1. fechar drawer;

2. criar negociação no estado local;

3. exibir negociação no histórico do PDV;

4. exibir negociação na página `Negociações`;

5. atualizar indicador de volume em negociação;

6. mostrar toast:

```text

Negociação registrada com sucesso.

```

---

## 7.7 Negociações — rota `/negociacoes`

Título:

```text

Negociações

```

Subtítulo:

```text

Acompanhamento diário de negociações e promessas registradas.

```

Cards de resumo:

| Título | Valor |

|---|---:|

| Negociações abertas | 7 |

| Valor total estimado | R$ 18.460 |

| Promessas de retirada | 4 |

| Pedidos confirmados | 3 |

Filtros:

```text

CD

Status

Data prevista de retirada

Prioridade

```

Tabela:

```text

PDV

CD

Oferta

Valor estimado

Data de retirada

Status

Observação

Ação

```

Ação:

```text

Ver PDV

```

Criar botão destacado:

```text

Revisar relatório diário

```

---

## 7.8 Modal: Revisar relatório diário

Ao clicar em `Revisar relatório diário`, abrir modal.

Título:

```text

Revisar relatório diário

```

Texto:

```text

Revise as negociações selecionadas antes de enviar o consolidado ao ponto focal do CD.

```

Exibir:

```text

CD Zona Sul — São Paulo

CD Osasco

Negociações incluídas

Valor estimado total

Promessas de retirada

Pedidos confirmados

Pendências de retorno

```

Exibir tabela resumida de negociações.

Botões:

```text

Cancelar

Confirmar envio do relatório

```

Ao confirmar:

1. alterar localmente o status das negociações incluídas para:

```text

Enviado ao ponto focal

```

2. fechar modal;

3. mostrar toast:

```text

Relatório diário enviado com sucesso.

As negociações selecionadas foram consolidadas para o ponto focal do CD.

```

Não realizar envio real.

---

## 7.9 Metas e desempenho — rota `/metas`

Título:

```text

Metas e desempenho

```

Subtítulo:

```text

Acompanhamento da carteira e da atividade comercial.

```

Criar seletor visual:

```text

Mês atual

Semana atual

```

Seção:

```text

Resultados da carteira

```

Exibir:

| Indicador | Atual | Meta | Texto |

|---|---:|---:|---|

| PDVs sem compra no CD | 8 | 5 | 3 ativações necessárias |

| Participação do CD nas compras | 46% | 52% | Evolução de 4 p.p. no mês |

| Aderência de mix ao CD | 58% | 64% | 6 p.p. para a meta |

| Sell-in da carteira | R$ 612.400 | R$ 700.000 | 87% da meta mensal |

Seção:

```text

Atividade do vendedor

```

Exibir:

| Indicador | Atual | Meta |

|---|---:|---:|

| Contatos realizados | 38 | 45 |

| Retornos agendados | 9 | 12 |

| Negociações em andamento | 7 | 10 |

| Pedidos confirmados | 6 | 8 |

Usar barras de progresso simples.

Não usar gráficos complexos.

---

# 8. INTERAÇÕES OBRIGATÓRIAS

Implementar de forma funcional em estado local:

1. Navegação por sidebar.

2. Navegação por cards e links.

3. Abrir detalhe de PDV por rota própria.

4. Busca de PDVs.

5. Filtros de PDVs.

6. Ordenação de PDVs.

7. Filtros na rota do dia.

8. Botão `Próximo PDV`.

9. Drawer de registro de resultado.

10. Drawer de registro de negociação.

11. Atualização local de status após salvar.

12. Inclusão local de histórico.

13. Inclusão local de negociação.

14. Atualização local de cards e contadores.

15. Modal de revisão do relatório.

16. Simulação de envio do relatório.

17. Toasts de sucesso.

18. Botões de cancelar funcionando.

19. Breadcrumbs navegáveis.

---

# 9. CRITÉRIOS DE ACEITE

A entrega estará correta se:

1. abrir diretamente na Visão geral;

2. estiver completamente em pt-BR;

3. tiver aparência corporativa e formal;

4. refletir visualmente a Market4U usando o site como referência;

5. tiver sidebar com as cinco áreas definidas;

6. tiver 30 PDVs mockados consistentes;

7. permitir navegar até qualquer PDV;

8. apresentar farol Alpha e recomendação Alpha como eixos separados;

9. permitir visualizar oportunidade de mix em PDVs elegíveis;

10. permitir registrar resultado de contato;

11. permitir registrar negociação;

12. permitir visualizar negociações;

13. permitir simular envio de relatório;

14. atualizar dados somente no estado local;

15. não tiver autenticação, backend, banco ou integrações;

16. não contiver conteúdo genérico, inglês, lorem ipsum ou telas não solicitadas;

17. não expuser cálculos, fórmulas ou complexidade técnica do Alpha;

18. permitir que um vendedor com ensino médio compreenda claramente a prioridade e a próxima ação em cada PDV.

Construa agora a aplicação completa seguindo exatamente esta especificação.

```

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1040cb31-417d-4824-bca8-dc6b3ff3648b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
