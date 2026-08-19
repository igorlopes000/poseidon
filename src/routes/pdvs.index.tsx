import { Link, createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

import { AcaoAlphaTag, PrioridadeBadge, StatusBadge } from "@/components/poseidon/badges";
import { PageHeader } from "@/components/poseidon/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CDS, ORDEM_PRIORIDADE, km, moeda } from "@/data/poseidon";
import { usePoseidon } from "@/state/poseidon-store";

const ACOES = [
  "Ativar",
  "Ativar com ajuste de mix",
  "Defender",
  "Priorizar volume",
  "Monitorar",
];
const PRIORIDADES = ["Muito alta", "Alta", "Média", "Baixa"];
const STATUS = [
  "Não contatado",
  "Retorno agendado",
  "Negociação em andamento",
  "Pedido confirmado",
  "Contato indisponível",
  "Sem interesse",
];
const ADERENCIAS = [
  "Sem compra no CD",
  "Baixa aderência ao CD",
  "Aderência intermediária ao CD",
  "Alta aderência ao CD",
];
const RAIOS = ["Até 5 km", "De 5 a 10 km", "Acima de 10 km"];
const ORDENACOES = [
  "Prioridade",
  "Faturamento mensal",
  "Aderência ao CD",
  "Distância",
  "Último contato",
];

export const Route = createFileRoute("/pdvs/")({
  head: () => ({
    meta: [
      { title: "PDVs — Poseidon Central de Vendas" },
      {
        name: "description",
        content:
          "Carteira demonstrativa de 30 PDVs com aderência ao CD, aderência de mix e recomendação Alpha.",
      },
      { property: "og:title", content: "PDVs — Poseidon Central de Vendas" },
      {
        property: "og:description",
        content:
          "Carteira demonstrativa de 30 PDVs com aderência ao CD, aderência de mix e recomendação Alpha.",
      },
    ],
  }),
  component: ListaPdvs,
});

function ListaPdvs() {
  const { pdvs } = usePoseidon();
  const [busca, setBusca] = useState("");
  const [acao, setAcao] = useState("Todos");
  const [prioridade, setPrioridade] = useState("Todos");
  const [status, setStatus] = useState("Todos");
  const [cd, setCd] = useState("Todos");
  const [aderencia, setAderencia] = useState("Todos");
  const [raio, setRaio] = useState("Todos");
  const [ordenacao, setOrdenacao] = useState("Prioridade");

  const termo = busca.trim().toLowerCase();

  const filtrados = pdvs
    .filter((pdv) => {
      if (
        termo &&
        ![pdv.nome, pdv.id, pdv.bairro, pdv.franqueado].some((campo) =>
          campo.toLowerCase().includes(termo),
        )
      )
        return false;
      if (acao !== "Todos" && pdv.acao !== acao) return false;
      if (prioridade !== "Todos" && pdv.prioridade !== prioridade) return false;
      if (status !== "Todos" && pdv.status !== status) return false;
      if (cd !== "Todos" && pdv.cd !== cd) return false;
      if (aderencia !== "Todos") {
        const a = pdv.aderenciaCd;
        if (aderencia === "Sem compra no CD" && a !== 0) return false;
        if (aderencia === "Baixa aderência ao CD" && !(a > 0 && a < 40)) return false;
        if (aderencia === "Aderência intermediária ao CD" && !(a >= 40 && a < 70)) return false;
        if (aderencia === "Alta aderência ao CD" && a < 70) return false;
      }
      if (raio !== "Todos") {
        const d = pdv.distanciaKm;
        if (raio === "Até 5 km" && d > 5) return false;
        if (raio === "De 5 a 10 km" && (d <= 5 || d > 10)) return false;
        if (raio === "Acima de 10 km" && d <= 10) return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (ordenacao) {
        case "Faturamento mensal":
          return b.faturamento - a.faturamento;
        case "Aderência ao CD":
          return b.aderenciaCd - a.aderenciaCd;
        case "Distância":
          return a.distanciaKm - b.distanciaKm;
        case "Último contato":
          return (b.ultimoContato ?? "").localeCompare(a.ultimoContato ?? "");
        default:
          return ORDEM_PRIORIDADE[a.prioridade] - ORDEM_PRIORIDADE[b.prioridade];
      }
    });

  return (
    <div className="space-y-6">
      <PageHeader titulo="PDVs" subtitulo="30 PDVs na carteira demonstrativa" />

      <div className="space-y-3">
        <div className="relative max-w-lg">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="bg-card pl-9"
            placeholder="Buscar por PDV, ID, bairro ou franqueado"
            aria-label="Buscar por PDV, ID, bairro ou franqueado"
          />
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <Filtro rotulo="Recomendação Alpha" valor={acao} onChange={setAcao} opcoes={ACOES} />
          <Filtro rotulo="Prioridade" valor={prioridade} onChange={setPrioridade} opcoes={PRIORIDADES} />
          <Filtro rotulo="Status de contato" valor={status} onChange={setStatus} opcoes={STATUS} />
          <Filtro rotulo="CD recomendado" valor={cd} onChange={setCd} opcoes={[...CDS]} />
          <Filtro rotulo="Aderência ao CD" valor={aderencia} onChange={setAderencia} opcoes={ADERENCIAS} />
          <Filtro rotulo="Raio de distância" valor={raio} onChange={setRaio} opcoes={RAIOS} />
          <Filtro
            rotulo="Ordenar por"
            valor={ordenacao}
            onChange={setOrdenacao}
            opcoes={ORDENACOES}
            semTodos
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[1200px] text-sm">
          <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-3 py-2 text-left font-medium">PDV</th>
              <th className="px-3 py-2 text-left font-medium">CD recomendado</th>
              <th className="px-3 py-2 text-right font-medium">Faturamento mensal</th>
              <th className="px-3 py-2 text-right font-medium">Aderência ao CD</th>
              <th className="px-3 py-2 text-right font-medium">Aderência de mix</th>
              <th className="px-3 py-2 text-right font-medium">Distância</th>
              <th className="px-3 py-2 text-left font-medium">Recomendação Alpha</th>
              <th className="px-3 py-2 text-left font-medium">Prioridade</th>
              <th className="px-3 py-2 text-left font-medium">Último contato</th>
              <th className="px-3 py-2 text-left font-medium">Status</th>
              <th className="px-3 py-2 text-left font-medium">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtrados.map((pdv) => (
              <tr key={pdv.id} className="hover:bg-muted/60">
                <td className="px-3 py-3">
                  <p className="font-medium text-foreground">{pdv.nome}</p>
                  <p className="text-xs text-muted-foreground">
                    {pdv.id} — {pdv.bairro} — {pdv.franqueado}
                  </p>
                </td>
                <td className="px-3 py-3 text-muted-foreground">{pdv.cd}</td>
                <td className="px-3 py-3 text-right tabular">{moeda(pdv.faturamento)}</td>
                <td className="px-3 py-3 text-right tabular">{pdv.aderenciaCd}%</td>
                <td className="px-3 py-3 text-right tabular">{pdv.aderenciaMix}%</td>
                <td className="px-3 py-3 text-right tabular">{km(pdv.distanciaKm)}</td>
                <td className="px-3 py-3">
                  <AcaoAlphaTag acao={pdv.acao} />
                </td>
                <td className="px-3 py-3">
                  <PrioridadeBadge prioridade={pdv.prioridade} />
                </td>
                <td className="px-3 py-3 tabular text-muted-foreground">
                  {pdv.ultimoContato ?? "Sem contato registrado"}
                </td>
                <td className="px-3 py-3">
                  <StatusBadge status={pdv.status} />
                </td>
                <td className="px-3 py-3">
                  <Button asChild variant="outline" size="sm">
                    <Link
                      to="/pdvs/$pdvId"
                      params={{ pdvId: pdv.id }}
                      search={{ origem: "pdvs" }}
                    >
                      Ver detalhe
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-3 py-6 text-center text-muted-foreground">
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
  semTodos = false,
}: {
  rotulo: string;
  valor: string;
  onChange: (valor: string) => void;
  opcoes: string[];
  semTodos?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs text-muted-foreground">
      {rotulo}
      <Select value={valor} onValueChange={onChange}>
        <SelectTrigger className="h-9 w-52 bg-card text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {semTodos ? null : <SelectItem value="Todos">Todos</SelectItem>}
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
