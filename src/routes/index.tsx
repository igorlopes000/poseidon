import { Link, createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

import { AcaoAlphaTag, FarolAlphaBadge, PrioridadeBadge, StatusBadge } from "@/components/poseidon/badges";
import { IndicadorCard, MetaCard, SecaoTitulo } from "@/components/poseidon/cards";
import { PageHeader } from "@/components/poseidon/page-header";
import { Button } from "@/components/ui/button";
import {
  DATA_REFERENCIA,
  METAS_CARTEIRA,
  ROTA_DO_DIA_IDS,
  moeda,
} from "@/data/poseidon";
import { usePoseidon } from "@/state/poseidon-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Visão geral — Poseidon Central de Vendas" },
      {
        name: "description",
        content:
          "Prioridades do dia, metas do mês e negociações abertas da carteira demonstrativa de PDVs.",
      },
      { property: "og:title", content: "Visão geral — Poseidon Central de Vendas" },
      {
        property: "og:description",
        content:
          "Prioridades do dia, metas do mês e negociações abertas da carteira demonstrativa de PDVs.",
      },
    ],
  }),
  component: VisaoGeral,
});

function VisaoGeral() {
  const { pdvs, negociacoes, contatosConcluidos } = usePoseidon();

  const rota = ROTA_DO_DIA_IDS.map((id) => pdvs.find((p) => p.id === id)!).filter(Boolean);
  const concluidosRota = rota.filter((p) => contatosConcluidos.includes(p.id)).length;
  const abertas = negociacoes.filter(
    (n) => n.status === "Em negociação" || n.status === "Promessa registrada",
  );
  const volume = abertas.reduce((total, n) => total + n.valor, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        titulo="Visão geral"
        subtitulo={DATA_REFERENCIA}
        complemento="Dados demonstrativos atualizados hoje às 08:00"
        mostrarVendedor
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <IndicadorCard
          titulo="PDVs previstos hoje"
          valor={rota.length}
          auxiliar={`${concluidosRota} contatos concluídos`}
        />
        <IndicadorCard
          titulo="Contatos realizados na semana"
          valor={33 + concluidosRota}
          auxiliar="Meta semanal: 45 contatos"
        />
        <IndicadorCard
          titulo="Negociações pendentes"
          valor={abertas.length}
          auxiliar="3 com retorno previsto hoje"
        />
        <IndicadorCard
          titulo="Volume estimado em negociação"
          valor={moeda(volume)}
          auxiliar="Dados demonstrativos"
        />
      </section>

      <section>
        <SecaoTitulo titulo="Metas do mês" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {METAS_CARTEIRA.map((m) => (
            <MetaCard
              key={m.indicador}
              indicador={m.indicador}
              atual={m.atual}
              meta={m.meta}
              texto={m.texto}
              progresso={m.progresso}
            />
          ))}
        </div>
      </section>

      <section>
        <SecaoTitulo
          titulo="Rota de hoje"
          acao={
            <Button asChild variant="outline" size="sm">
              <Link to="/rota-do-dia">Ver rota completa</Link>
            </Button>
          }
        />
        <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
          {rota.slice(0, 6).map((pdv, indice) => (
            <div
              key={pdv.id}
              className="flex flex-wrap items-center gap-4 px-4 py-3 text-sm"
            >
              <span className="w-6 shrink-0 text-sm font-semibold text-muted-foreground tabular">
                {indice + 1}
              </span>
              <div className="min-w-56 flex-1">
                <p className="font-medium text-foreground">{pdv.nome}</p>
                <p className="text-xs text-muted-foreground">{pdv.id}</p>
              </div>
              <FarolAlphaBadge aderenciaCd={pdv.aderenciaCd} />
              <AcaoAlphaTag acao={pdv.acao} />
              <PrioridadeBadge prioridade={pdv.prioridade} />
              <StatusBadge status={pdv.status} />
              <Button asChild variant="outline" size="sm">
                <Link to="/pdvs/$pdvId" params={{ pdvId: pdv.id }} search={{ origem: "rota" }}>
                  Ver PDV
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div>
          <SecaoTitulo titulo="Atenção hoje" />
          <ul className="space-y-2 rounded-lg border border-border bg-card p-4">
            {[
              "3 retornos agendados para hoje",
              "2 negociações com retirada prevista nesta semana",
              "4 PDVs de prioridade muito alta sem contato registrado",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SecaoTitulo
            titulo="Negociações do dia"
            acao={
              <Button asChild variant="outline" size="sm">
                <Link to="/negociacoes">Ver negociações</Link>
              </Button>
            }
          />
          <div className="divide-y divide-border rounded-lg border border-border bg-card">
            {negociacoes.slice(0, 3).map((n) => {
              const pdv = pdvs.find((p) => p.id === n.pdvId);
              return (
                <div key={n.id} className="px-4 py-3 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-foreground">
                      {pdv?.nome ?? n.pdvId}
                    </p>
                    <span className="font-semibold tabular text-foreground">
                      {moeda(n.valor)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {n.oferta} — {n.cd} — retirada em {n.dataRetirada}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
