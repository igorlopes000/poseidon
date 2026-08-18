import { TEXTO_FAROL, farolDe, type AcaoAlpha, type Prioridade, type StatusContato } from "@/data/poseidon";
import { cn } from "@/lib/utils";

const FAROL_CLASSES: Record<string, string> = {
  Azul: "bg-info-soft text-info border-info/30",
  Vermelho: "bg-danger-soft text-danger border-danger/30",
  Amarelo: "bg-warning-soft text-warning border-warning/40",
  Verde: "bg-success-soft text-primary-dark border-primary/30",
};

const FAROL_DOT: Record<string, string> = {
  Azul: "bg-info",
  Vermelho: "bg-danger",
  Amarelo: "bg-warning",
  Verde: "bg-primary",
};

export function FarolAlphaBadge({
  aderenciaCd,
  compacto = false,
}: {
  aderenciaCd: number;
  compacto?: boolean;
}) {
  const farol = farolDe(aderenciaCd);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs font-medium",
        FAROL_CLASSES[farol],
      )}
    >
      <span className={cn("size-2 rounded-full", FAROL_DOT[farol])} aria-hidden="true" />
      <span>{compacto ? farol : `${farol} — ${TEXTO_FAROL[farol]}`}</span>
    </span>
  );
}

const PRIORIDADE_CLASSES: Record<Prioridade, string> = {
  "Muito alta": "bg-danger-soft text-danger border-danger/30",
  Alta: "bg-warning-soft text-warning border-warning/40",
  Média: "bg-secondary text-secondary-foreground border-border",
  Baixa: "bg-muted text-muted-foreground border-border",
};

export function PrioridadeBadge({ prioridade }: { prioridade: Prioridade }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-2 py-0.5 text-xs font-medium",
        PRIORIDADE_CLASSES[prioridade],
      )}
    >
      {prioridade}
    </span>
  );
}

const STATUS_CLASSES: Record<StatusContato, string> = {
  "Não contatado": "bg-muted text-muted-foreground border-border",
  "Retorno agendado": "bg-info-soft text-info border-info/30",
  "Negociação em andamento": "bg-warning-soft text-warning border-warning/40",
  "Pedido confirmado": "bg-success-soft text-primary-dark border-primary/30",
  "Contato indisponível": "bg-danger-soft text-danger border-danger/30",
  "Sem interesse": "bg-secondary text-secondary-foreground border-border",
};

export function StatusBadge({ status }: { status: StatusContato }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-2 py-0.5 text-xs font-medium",
        STATUS_CLASSES[status],
      )}
    >
      {status}
    </span>
  );
}

export function AcaoAlphaTag({ acao }: { acao: AcaoAlpha }) {
  return (
    <span className="inline-flex rounded-md border border-primary/25 bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary-dark">
      {acao}
    </span>
  );
}

export function StatusNegociacaoBadge({ status }: { status: string }) {
  const classes: Record<string, string> = {
    "Em negociação": "bg-warning-soft text-warning border-warning/40",
    "Promessa registrada": "bg-info-soft text-info border-info/30",
    "Pedido confirmado": "bg-success-soft text-primary-dark border-primary/30",
    Cancelada: "bg-danger-soft text-danger border-danger/30",
    "Enviado ao ponto focal": "bg-secondary text-secondary-foreground border-border",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-2 py-0.5 text-xs font-medium",
        classes[status] ?? "bg-muted text-muted-foreground border-border",
      )}
    >
      {status}
    </span>
  );
}
