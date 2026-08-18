import type { ReactNode } from "react";

import { VENDEDOR } from "@/data/poseidon";

export function PageHeader({
  titulo,
  subtitulo,
  complemento,
  acoes,
  mostrarVendedor = false,
}: {
  titulo: string;
  subtitulo?: string;
  complemento?: string;
  acoes?: ReactNode;
  mostrarVendedor?: boolean;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
      <div>
        <h1 className="text-2xl text-foreground">{titulo}</h1>
        {subtitulo ? (
          <p className="mt-1 text-sm text-muted-foreground">{subtitulo}</p>
        ) : null}
        {complemento ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{complemento}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-4">
        {acoes}
        {mostrarVendedor ? (
          <div className="rounded-md border border-border bg-card px-4 py-2 text-right">
            <p className="text-xs text-muted-foreground">Vendedor responsável</p>
            <p className="text-sm font-semibold text-foreground">{VENDEDOR}</p>
          </div>
        ) : null}
      </div>
    </header>
  );
}
