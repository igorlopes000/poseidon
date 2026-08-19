import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  AcaoAlphaTag,
  FarolAlphaBadge,
  PrioridadeBadge,
  StatusBadge,
  StatusNegociacaoBadge,
} from "@/components/poseidon/badges";
import { IndicadorCard, SecaoTitulo } from "@/components/poseidon/cards";
import { DrawerNegociacao } from "@/components/poseidon/drawer-negociacao";
import { DrawerResultado } from "@/components/poseidon/drawer-resultado";
import { Button } from "@/components/ui/button";
import {
  AVISO_OFERTA,
  OFERTAS,
  OFERTAS_POR_CATEGORIA,
  PROXIMA_ACAO,
  PROXIMO_PASSO,
  SUGESTOES_MIX,
  TEXTO_OPORTUNIDADE,
  km,
  moeda,
} from "@/data/poseidon";
import { usePoseidon } from "@/state/poseidon-store";

export const Route = createFileRoute("/pdvs/$pdvId")({
  validateSearch: (search: Record<string, unknown>) => ({
    origem: search.origem === "rota" ? "rota" : "pdvs",
  }),
  head: () => ({
    meta: [
      { title: "Detalhe do PDV — Poseidon Central de Vendas" },
      {
        name: "description",
        content:
          "Contexto do PDV, recomendação Alpha, oportunidade de mix, ofertas liberadas e histórico de contatos.",
      },
      { property: "og:title", content: "Detalhe do PDV — Poseidon Central de Vendas" },
      {
        property: "og:description",
        content:
          "Contexto do PDV, recomendação Alpha, oportunidade de mix, ofertas liberadas e histórico de contatos.",
      },
    ],
  }),
  component: DetalhePdv,
});

function DetalhePdv() {
  const { pdvId } = Route.useParams();
  const { origem } = Route.useSearch();
  const { pdvs, historicos, negociacoes } = usePoseidon();

  const [resultadoAberto, setResultadoAberto] = useState(false);
  const [negociacaoAberta, setNegociacaoAberta] = useState(false);
  const [ofertaSelecionada, setOfertaSelecionada] = useState<string | undefined>();

  const pdv = pdvs.find((p) => p.id === pdvId);

  if (!pdv) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h1 className="text-lg text-foreground">PDV não encontrado</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Verifique o identificador informado e tente novamente.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/pdvs">Voltar para PDVs</Link>
        </Button>
      </div>
    );
  }

  const historico = historicos[pdv.id] ?? [];
  const negociacoesDoPdv = negociacoes.filter((n) => n.pdvId === pdv.id);
  const ofertasDoPdv = OFERTAS_POR_CATEGORIA[pdv.categoria]
    .map((id) => OFERTAS.find((o) => o.id === id))
    .filter((o): o is NonNullable<typeof o> => Boolean(o));

  function abrirNegociacao(oferta?: string) {
    setOfertaSelecionada(oferta);
    setResultadoAberto(false);
    setNegociacaoAberta(true);
  }

  return (
    <div className="space-y-6">
      <nav aria-label="Trilha de navegação" className="text-sm text-muted-foreground">
        {origem === "rota" ? (
          <Link to="/rota-do-dia" className="hover:text-foreground">
            Rota do dia
          </Link>
        ) : (
          <Link to="/pdvs" className="hover:text-foreground">
            PDVs
          </Link>
        )}
        <span className="px-2">/</span>
        <span className="text-foreground">{pdv.nome}</span>
      </nav>

      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl text-foreground">{pdv.nome}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{pdv.id}</p>
          <p className="text-sm text-foreground">Franqueado: {pdv.franqueado}</p>
          <p className="text-sm text-muted-foreground">{pdv.bairro} — São Paulo</p>
        </div>
        <div className="space-y-2 text-right">
          <div className="flex items-center justify-end gap-2 text-sm">
            <span className="text-muted-foreground">Status:</span>
            <StatusBadge status={pdv.status} />
          </div>
          <p className="text-sm text-foreground">
            <span className="text-muted-foreground">CD recomendado: </span>
            {pdv.cd}
          </p>
          <div className="flex flex-wrap justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setResultadoAberto(true)}>
              Registrar resultado
            </Button>
            <Button onClick={() => abrirNegociacao()}>Registrar negociação</Button>
          </div>
        </div>
      </header>

      <section className="rounded-lg border border-primary/25 bg-primary-soft p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-primary-dark">
          Recomendação Alpha
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="text-xl font-semibold text-primary-dark">{pdv.acao}</span>
          <PrioridadeBadge prioridade={pdv.prioridade} />
          <FarolAlphaBadge aderenciaCd={pdv.aderenciaCd} />
        </div>
        <p className="mt-1 text-sm text-primary-dark">Prioridade: {pdv.prioridade}</p>
        <p className="mt-2 max-w-3xl text-sm text-foreground">
          {TEXTO_OPORTUNIDADE[pdv.acao]}
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <IndicadorCard titulo="Faturamento mensal total" valor={moeda(pdv.faturamento)} />
        <IndicadorCard titulo="Sell-in via CD" valor={moeda(pdv.sellIn)} />
        <IndicadorCard
          titulo="Aderência ao CD"
          valor={`${pdv.aderenciaCd}%`}
          auxiliar={pdv.aderenciaCd === 0 ? "Sem compra no CD" : undefined}
        />
        <IndicadorCard titulo="Aderência de mix" valor={`${pdv.aderenciaMix}%`} />
        <IndicadorCard titulo="Distância até o CD" valor={km(pdv.distanciaKm)} />
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Próxima ação
          </p>
          <p className="mt-2 text-sm text-foreground">{PROXIMA_ACAO[pdv.acao]}</p>
        </div>
      </section>

      <section>
        <SecaoTitulo titulo="Contexto do PDV" />
        <dl className="grid gap-4 rounded-lg border border-border bg-card p-4 text-sm sm:grid-cols-2">
          <Linha rotulo="Categoria dominante" valor={pdv.categoria} />
          <Linha rotulo="SKUs ativos estimados" valor={String(pdv.skus)} />
          <Linha
            rotulo="Último contato"
            valor={pdv.ultimoContato ?? "Sem contato registrado"}
          />
          <Linha rotulo="Próximo passo" valor={PROXIMO_PASSO[pdv.status]} />
        </dl>
      </section>

      <section>
        <SecaoTitulo
          titulo="Oportunidade de mix"
          descricao="Itens fora do portfólio atual do CD com substitutos disponíveis."
        />
        {pdv.acao === "Ativar com ajuste de mix" ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {SUGESTOES_MIX[pdv.categoria].map((s) => (
              <div key={s.atual} className="rounded-lg border border-border bg-card p-4 text-sm">
                <p className="text-xs text-muted-foreground">Produto atual</p>
                <p className="font-medium text-foreground">{s.atual}</p>
                <p className="mt-3 text-xs text-muted-foreground">Substituto disponível</p>
                <p className="font-medium text-foreground">{s.substituto}</p>
                <p className="mt-3 text-xs text-muted-foreground">Categoria</p>
                <p className="text-foreground">{s.categoria}</p>
                <p className="mt-3 text-xs text-muted-foreground">Oportunidade</p>
                <p className="text-foreground">{s.oportunidade}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
            Não há sugestão prioritária de substituição de mix para este momento.
          </p>
        )}
      </section>

      <section>
        <SecaoTitulo titulo="Ofertas e combos liberados" />
        <div className="grid gap-4 lg:grid-cols-3">
          {ofertasDoPdv.map((oferta) => (
            <div
              key={oferta.id}
              className="flex flex-col rounded-lg border border-border bg-card p-4 text-sm"
            >
              <p className="font-semibold text-foreground">{oferta.nome}</p>
              <p className="mt-2 text-muted-foreground">{oferta.condicao}</p>
              <p className="mt-2 text-xs text-muted-foreground">Foco: {oferta.foco}</p>
              <p className="text-xs text-muted-foreground">Validade: {oferta.validade}</p>
              <p className="mt-3 text-xs text-muted-foreground">{AVISO_OFERTA}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => abrirNegociacao(oferta.nome)}
              >
                Adicionar à negociação
              </Button>
            </div>
          ))}
        </div>
      </section>

      {negociacoesDoPdv.length > 0 ? (
        <section>
          <SecaoTitulo titulo="Negociações registradas" />
          <div className="divide-y divide-border rounded-lg border border-border bg-card">
            {negociacoesDoPdv.map((n) => (
              <div key={n.id} className="flex flex-wrap items-center gap-3 px-4 py-3 text-sm">
                <span className="min-w-56 flex-1 font-medium text-foreground">{n.oferta}</span>
                <span className="tabular text-foreground">{moeda(n.valor)}</span>
                <span className="text-xs text-muted-foreground">
                  Retirada em {n.dataRetirada} — {n.cd}
                </span>
                <StatusNegociacaoBadge status={n.status} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <SecaoTitulo titulo="Histórico de visitas" />
        {historico.length === 0 ? (
          <p className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
            Nenhum contato registrado.
          </p>
        ) : (
          <ol className="divide-y divide-border rounded-lg border border-border bg-card">
            {historico.slice(0, 3).map((visita, indice) => (
              <li key={`${visita.data}-${indice}`} className="px-4 py-3 text-sm">
                <p className="font-medium text-foreground">
                  {visita.data} — {visita.titulo}
                </p>
                <p className="mt-1 text-muted-foreground">{visita.descricao}</p>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="flex flex-wrap gap-2 border-t border-border pt-5">
        <Button variant="outline" onClick={() => setResultadoAberto(true)}>
          Registrar resultado
        </Button>
        <Button onClick={() => abrirNegociacao()}>Registrar negociação</Button>
        <span className="ml-auto self-center text-xs text-muted-foreground">
          Recomendação Alpha: {pdv.acao}
        </span>
        <AcaoAlphaTag acao={pdv.acao} />
      </section>

      <DrawerResultado
        pdv={pdv}
        aberto={resultadoAberto}
        onOpenChange={setResultadoAberto}
        onAbrirNegociacao={() => abrirNegociacao()}
      />
      <DrawerNegociacao
        pdv={pdv}
        aberto={negociacaoAberta}
        ofertaInicial={ofertaSelecionada}
        onOpenChange={setNegociacaoAberta}
      />
    </div>
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{rotulo}</dt>
      <dd className="mt-0.5 text-foreground">{valor}</dd>
    </div>
  );
}
