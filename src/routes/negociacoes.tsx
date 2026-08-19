import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { StatusNegociacaoBadge } from "@/components/poseidon/badges";
import { IndicadorCard, SecaoTitulo } from "@/components/poseidon/cards";
import { PageHeader } from "@/components/poseidon/page-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CDS, moeda } from "@/data/poseidon";
import { usePoseidon } from "@/state/poseidon-store";

const STATUS = [
  "Em negociação",
  "Promessa registrada",
  "Pedido confirmado",
  "Cancelada",
  "Enviado ao ponto focal",
];
const PRIORIDADES = ["Muito alta", "Alta", "Média", "Baixa"];

export const Route = createFileRoute("/negociacoes")({
  head: () => ({
    meta: [
      { title: "Negociações — Poseidon Central de Vendas" },
      {
        name: "description",
        content:
          "Acompanhamento diário de negociações, promessas de retirada e consolidado para o ponto focal do CD.",
      },
      { property: "og:title", content: "Negociações — Poseidon Central de Vendas" },
      {
        property: "og:description",
        content:
          "Acompanhamento diário de negociações, promessas de retirada e consolidado para o ponto focal do CD.",
      },
    ],
  }),
  component: Negociacoes,
});

function Negociacoes() {
  const { negociacoes, pdvs, enviarRelatorio } = usePoseidon();
  const [cd, setCd] = useState("Todos");
  const [status, setStatus] = useState("Todos");
  const [dataRetirada, setDataRetirada] = useState("Todas");
  const [prioridade, setPrioridade] = useState("Todos");
  const [modalAberto, setModalAberto] = useState(false);

  const datas = Array.from(new Set(negociacoes.map((n) => n.dataRetirada))).sort();

  const filtradas = negociacoes.filter((n) => {
    const pdv = pdvs.find((p) => p.id === n.pdvId);
    if (cd !== "Todos" && n.cd !== cd) return false;
    if (status !== "Todos" && n.status !== status) return false;
    if (dataRetirada !== "Todas" && n.dataRetirada !== dataRetirada) return false;
    if (prioridade !== "Todos" && pdv?.prioridade !== prioridade) return false;
    return true;
  });

  const abertas = negociacoes.filter(
    (n) => n.status === "Em negociação" || n.status === "Promessa registrada",
  );
  const promessas = negociacoes.filter((n) => n.status === "Promessa registrada");
  const confirmados = negociacoes.filter((n) => n.status === "Pedido confirmado");
  const valorTotal = abertas.reduce((total, n) => total + n.valor, 0);

  function confirmarEnvio() {
    enviarRelatorio(abertas.map((n) => n.id));
    setModalAberto(false);
    toast.success("Relatório diário enviado com sucesso.", {
      description:
        "As negociações selecionadas foram consolidadas para o ponto focal do CD.",
    });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        titulo="Negociações"
        subtitulo="Acompanhamento diário de negociações e promessas registradas."
        acoes={
          <Button onClick={() => setModalAberto(true)} disabled={abertas.length === 0}>
            Revisar relatório diário
          </Button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <IndicadorCard titulo="Negociações abertas" valor={abertas.length} />
        <IndicadorCard titulo="Valor total estimado" valor={moeda(valorTotal)} />
        <IndicadorCard titulo="Promessas de retirada" valor={promessas.length} />
        <IndicadorCard titulo="Pedidos confirmados" valor={confirmados.length} />
      </section>

      <div className="flex flex-wrap items-end gap-3">
        <Filtro rotulo="CD" valor={cd} onChange={setCd} opcoes={[...CDS]} />
        <Filtro rotulo="Status" valor={status} onChange={setStatus} opcoes={STATUS} />
        <Filtro
          rotulo="Data prevista de retirada"
          valor={dataRetirada}
          onChange={setDataRetirada}
          opcoes={datas}
          rotuloTodos="Todas"
        />
        <Filtro rotulo="Prioridade" valor={prioridade} onChange={setPrioridade} opcoes={PRIORIDADES} />
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[1100px] text-sm">
          <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-3 py-2 text-left font-medium">PDV</th>
              <th className="px-3 py-2 text-left font-medium">CD</th>
              <th className="px-3 py-2 text-left font-medium">Oferta</th>
              <th className="px-3 py-2 text-right font-medium">Valor estimado</th>
              <th className="px-3 py-2 text-left font-medium">Data de retirada</th>
              <th className="px-3 py-2 text-left font-medium">Status</th>
              <th className="px-3 py-2 text-left font-medium">Observação</th>
              <th className="px-3 py-2 text-left font-medium">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtradas.map((n) => {
              const pdv = pdvs.find((p) => p.id === n.pdvId);
              return (
                <tr key={n.id} className="align-top hover:bg-muted/60">
                  <td className="px-3 py-3">
                    <p className="font-medium text-foreground">{pdv?.nome ?? n.pdvId}</p>
                    <p className="text-xs text-muted-foreground">{n.pdvId}</p>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{n.cd}</td>
                  <td className="px-3 py-3">{n.oferta}</td>
                  <td className="px-3 py-3 text-right tabular">{moeda(n.valor)}</td>
                  <td className="px-3 py-3 tabular">{n.dataRetirada}</td>
                  <td className="px-3 py-3">
                    <StatusNegociacaoBadge status={n.status} />
                  </td>
                  <td className="max-w-72 px-3 py-3 text-xs text-muted-foreground">
                    {n.observacao}
                  </td>
                  <td className="px-3 py-3">
                    <Button asChild variant="outline" size="sm">
                      <Link
                        to="/pdvs/$pdvId"
                        params={{ pdvId: n.pdvId }}
                        search={{ origem: "pdvs" }}
                      >
                        Ver PDV
                      </Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
            {filtradas.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-muted-foreground">
                  Nenhuma negociação encontrada com os filtros aplicados.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Revisar relatório diário</DialogTitle>
            <DialogDescription>
              Revise as negociações selecionadas antes de enviar o consolidado ao ponto focal do
              CD.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 sm:grid-cols-2">
            {CDS.map((nomeCd) => {
              const doCd = abertas.filter((n) => n.cd === nomeCd);
              return (
                <div key={nomeCd} className="rounded-md border border-border p-3 text-sm">
                  <p className="font-medium text-foreground">{nomeCd}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {doCd.length} negociações — {moeda(doCd.reduce((t, n) => t + n.valor, 0))}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ResumoItem rotulo="Negociações incluídas" valor={String(abertas.length)} />
            <ResumoItem rotulo="Valor estimado total" valor={moeda(valorTotal)} />
            <ResumoItem rotulo="Promessas de retirada" valor={String(promessas.length)} />
            <ResumoItem rotulo="Pedidos confirmados" valor={String(confirmados.length)} />
          </div>

          <div className="rounded-md border border-border p-3 text-sm">
            <p className="font-medium text-foreground">Pendências de retorno</p>
            <p className="mt-1 text-xs text-muted-foreground">
              3 retornos agendados aguardam contato hoje.
            </p>
          </div>

          <div>
            <SecaoTitulo titulo="Negociações incluídas no relatório" />
            <div className="overflow-x-auto rounded-md border border-border">
              <table className="w-full min-w-[520px] text-sm">
                <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">PDV</th>
                    <th className="px-3 py-2 text-left font-medium">Oferta</th>
                    <th className="px-3 py-2 text-right font-medium">Valor</th>
                    <th className="px-3 py-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {abertas.map((n) => (
                    <tr key={n.id}>
                      <td className="px-3 py-2">{n.pdvId}</td>
                      <td className="px-3 py-2">{n.oferta}</td>
                      <td className="px-3 py-2 text-right tabular">{moeda(n.valor)}</td>
                      <td className="px-3 py-2">
                        <StatusNegociacaoBadge status={n.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <DialogFooter className="flex-row justify-end gap-2">
            <Button variant="outline" onClick={() => setModalAberto(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmarEnvio}>Confirmar envio do relatório</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ResumoItem({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-md border border-border p-3">
      <p className="text-xs text-muted-foreground">{rotulo}</p>
      <p className="mt-1 text-lg font-semibold tabular text-foreground">{valor}</p>
    </div>
  );
}

function Filtro({
  rotulo,
  valor,
  onChange,
  opcoes,
  rotuloTodos = "Todos",
}: {
  rotulo: string;
  valor: string;
  onChange: (valor: string) => void;
  opcoes: string[];
  rotuloTodos?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs text-muted-foreground">
      {rotulo}
      <Select value={valor} onValueChange={onChange}>
        <SelectTrigger className="h-9 w-56 bg-card text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={rotuloTodos}>{rotuloTodos}</SelectItem>
          {opcoes.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
