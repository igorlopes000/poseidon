import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { MetaCard, SecaoTitulo } from "@/components/poseidon/cards";
import { PageHeader } from "@/components/poseidon/page-header";
import { METAS_ATIVIDADE, METAS_CARTEIRA } from "@/data/poseidon";
import { cn } from "@/lib/utils";

const PERIODOS = ["Mês atual", "Semana atual"] as const;

export const Route = createFileRoute("/metas")({
  head: () => ({
    meta: [
      { title: "Metas e desempenho — Poseidon Central de Vendas" },
      {
        name: "description",
        content:
          "Resultados da carteira e atividade comercial do vendedor no ambiente demonstrativo.",
      },
      { property: "og:title", content: "Metas e desempenho — Poseidon Central de Vendas" },
      {
        property: "og:description",
        content:
          "Resultados da carteira e atividade comercial do vendedor no ambiente demonstrativo.",
      },
    ],
  }),
  component: Metas,
});

function Metas() {
  const [periodo, setPeriodo] = useState<(typeof PERIODOS)[number]>("Mês atual");

  return (
    <div className="space-y-6">
      <PageHeader
        titulo="Metas e desempenho"
        subtitulo="Acompanhamento da carteira e da atividade comercial."
        acoes={
          <div
            className="inline-flex rounded-md border border-border bg-card p-1"
            role="group"
            aria-label="Período"
          >
            {PERIODOS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriodo(p)}
                className={cn(
                  "rounded px-3 py-1.5 text-sm transition-colors",
                  periodo === p
                    ? "bg-primary font-medium text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {p}
              </button>
            ))}
          </div>
        }
      />

      <section>
        <SecaoTitulo titulo="Resultados da carteira" descricao={`Período: ${periodo}`} />
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
        <SecaoTitulo titulo="Atividade do vendedor" descricao={`Período: ${periodo}`} />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {METAS_ATIVIDADE.map((m) => (
            <MetaCard
              key={m.indicador}
              indicador={m.indicador}
              atual={String(m.atual)}
              meta={String(m.meta)}
              progresso={Math.round((m.atual / m.meta) * 100)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
