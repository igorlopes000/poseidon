import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { AcaoAlphaTag, FarolAlphaBadge, PrioridadeBadge, StatusBadge } from "@/components/poseidon/badges";
import { PageHeader } from "@/components/poseidon/page-header";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CDS,
  ORDEM_PRIORIDADE,
  ROTA_DO_DIA_IDS,
  TEXTO_OPORTUNIDADE,
  km,
} from "@/data/poseidon";
import { usePoseidon } from "@/state/poseidon-store";

const PRIORIDADES = ["Muito alta", "Alta", "Média", "Baixa"];
const ACOES = [
  "Ativar",
  "Ativar com ajuste de mix",
  "Defender",
  "Priorizar volume",
  "Monitorar",
];

export const Route = createFileRoute("/rota-do-dia")({
  head: () => ({
    meta: [
      { title: "Rota do dia — Poseidon Central de Vendas" },
      {
        name: "description",
        content:
          "Sequência de PDVs prioritários do dia com farol Alpha, recomendação Alpha e status de contato.",
      },
      { property: "og:title", content: "Rota do dia — Poseidon Central de Vendas" },
      {
        property: "og:description",
        content:
          "Sequência de PDVs prioritários do dia com farol Alpha, recomendação Alpha e status de contato.",
      },
    ],
  }),
  component: RotaDoDia,
});

function RotaDoDia() {
  const { pdvs, contatosConcluidos } = usePoseidon();
  const navigate = useNavigate();

  const [prioridade, setPrioridade] = useState("Todos");
  const [acao, setAcao] = useState("Todos");
  const [statusContato, setStatusContato] = useState("Todos");
  const [cd, setCd] = useState("Todos");

  const rota = useMemo(
    () =>
      ROTA_DO_DIA_IDS.map((id) => pdvs.find((p) => p.id === id)).filter(
        (p): p is NonNullable<typeof p> => Boolean(p),
      ),
    [pdvs],
  );

  const concluidos = rota.filter((p) => contatosConcluidos.includes(p.id));
  const pendentes = rota.filter((p) => !contatosConcluidos.includes(p.id));

  const filtrados = rota.filter((pdv) => {
    if (prioridade !== "Todos" && pdv.prioridade !== prioridade) return false;
    if (acao !== "Todos" && pdv.acao !== acao) return false;
    if (statusContato !== "Todos") {
      const concluido = contatosConcluidos.includes(pdv.id);
      if (statusContato === "Concluído" && !concluido) return false;
      if (statusContato === "Pendente" && concluido) return false;
    }
    if (cd !== "Todos" && pdv.cd !== cd) return false;
    return true;
  });

  function proximoPdv() {
    const ordenados = [...pendentes].sort(
      (a, b) => ORDEM_PRIORIDADE[a.prioridade] - ORDEM_PRIORIDADE[b.prioridade],
    );
    const alvo = ordenados[0];
    if (!alvo) return;
    void navigate({
      to: "/pdvs/$pdvId",
      params: { pdvId: alvo.id },
      search: { origem: "rota" },
    });
  }

  function limpar() {
    setPrioridade("Todos");
    setAcao("Todos");
    setStatusContato("Todos");
    setCd("Todos");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        titulo="Rota do dia"
        subtitulo="Prioridades comerciais para 18 de agosto de 2026"
        acoes={
          <Button onClick={proximoPdv} disabled={pendentes.length === 0}>
            Próximo PDV
          </Button>
        }
      />

      <div className="flex flex-wrap gap-6 rounded-lg border border-border bg-card px-4 py-3 text-sm">
        <span className="text-foreground">
          <strong className="font-semibold tabular">{rota.length}</strong> PDVs previstos
        </span>
        <span className="text-foreground">
          <strong className="font-semibold tabular">{concluidos.length}</strong> contatos concluídos
        </span>
        <span className="text-foreground">
          <strong className="font-semibold tabular">{pendentes.length}</strong> contatos pendentes
        </span>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <Filtro rotulo="Prioridade" valor={prioridade} onChange={setPrioridade} opcoes={PRIORIDADES} />
        <Filtro rotulo="Recomendação Alpha" valor={acao} onChange={setAcao} opcoes={ACOES} />
        <Filtro
          rotulo="Status de contato"
          valor={statusContato}
          onChange={setStatusContato}
          opcoes={["Concluído", "Pendente"]}
        />
        <Filtro rotulo="CD recomendado" valor={cd} onChange={setCd} opcoes={[...CDS]} />
        <Button variant="ghost" size="sm" onClick={limpar}>
          Todos
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[1100px] text-sm">
          <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Ordem</th>
              <th className="px-3 py-2 text-left font-medium">PDV</th>
              <th className="px-3 py-2 text-left font-medium">CD recomendado</th>
              <th className="px-3 py-2 text-right font-medium">Distância</th>
              <th className="px-3 py-2 text-left font-medium">Farol Alpha</th>
              <th className="px-3 py-2 text-left font-medium">Recomendação Alpha</th>
              <th className="px-3 py-2 text-left font-medium">Prioridade</th>
              <th className="px-3 py-2 text-left font-medium">Oportunidade</th>
              <th className="px-3 py-2 text-left font-medium">Status</th>
              <th className="px-3 py-2 text-left font-medium">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtrados.map((pdv) => (
              <tr key={pdv.id} className="align-top hover:bg-muted/60">
                <td className="px-3 py-3 tabular text-muted-foreground">
                  {ROTA_DO_DIA_IDS.indexOf(pdv.id) + 1}
                </td>
                <td className="px-3 py-3">
                  <p className="font-medium text-foreground">{pdv.nome}</p>
                  <p className="text-xs text-muted-foreground">
                    {pdv.id} — {pdv.bairro}
                  </p>
                </td>
                <td className="px-3 py-3 text-muted-foreground">{pdv.cd}</td>
                <td className="px-3 py-3 text-right tabular">{km(pdv.distanciaKm)}</td>
                <td className="px-3 py-3">
                  <FarolAlphaBadge aderenciaCd={pdv.aderenciaCd} />
                </td>
                <td className="px-3 py-3">
                  <AcaoAlphaTag acao={pdv.acao} />
                </td>
                <td className="px-3 py-3">
                  <PrioridadeBadge prioridade={pdv.prioridade} />
                </td>
                <td className="max-w-72 px-3 py-3 text-xs text-muted-foreground">
                  {TEXTO_OPORTUNIDADE[pdv.acao]}
                </td>
                <td className="px-3 py-3">
                  <StatusBadge status={pdv.status} />
                </td>
                <td className="px-3 py-3">
                  <Button asChild variant="outline" size="sm">
                    <Link
                      to="/pdvs/$pdvId"
                      params={{ pdvId: pdv.id }}
                      search={{ origem: "rota" }}
                    >
                      Ver PDV
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-3 py-6 text-center text-muted-foreground">
                  Nenhum PDV encontrado com os filtros aplicados.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Filtro({
  rotulo,
  valor,
  onChange,
  opcoes,
}: {
  rotulo: string;
  valor: string;
  onChange: (valor: string) => void;
  opcoes: string[];
}) {
  return (
    <label className="flex flex-col gap-1 text-xs text-muted-foreground">
      {rotulo}
      <Select value={valor} onValueChange={onChange}>
        <SelectTrigger className="h-9 w-56 bg-card text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Todos">Todos</SelectItem>
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
