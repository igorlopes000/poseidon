import type { ReactNode } from "react";

export function IndicadorCard({
  titulo,
  valor,
  auxiliar,
}: {
  titulo: string;
  valor: ReactNode;
  auxiliar?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {titulo}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular text-foreground">{valor}</p>
      {auxiliar ? <p className="mt-1 text-xs text-muted-foreground">{auxiliar}</p> : null}
    </div>
  );
}

export function MetaCard({
  indicador,
  atual,
  meta,
  texto,
  progresso,
}: {
  indicador: string;
  atual: string;
  meta: string;
  texto?: string;
  progresso: number;
}) {
  const largura = Math.min(100, Math.max(0, progresso));
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-medium text-foreground">{indicador}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-xl font-semibold tabular text-foreground">{atual}</span>
        <span className="text-xs text-muted-foreground">Meta: {meta}</span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary" style={{ width: `${largura}%` }} />
      </div>
      {texto ? <p className="mt-2 text-xs text-muted-foreground">{texto}</p> : null}
    </div>
  );
}

export function SecaoTitulo({
  titulo,
  descricao,
  acao,
}: {
  titulo: string;
  descricao?: string;
  acao?: ReactNode;
}) {
  return (
    <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 className="text-base text-foreground">{titulo}</h2>
        {descricao ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{descricao}</p>
        ) : null}
      </div>
      {acao}
    </div>
  );
}
