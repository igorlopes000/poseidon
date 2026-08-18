import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import {
  NEGOCIACOES_INICIAIS,
  PDVS_INICIAIS,
  historicoInicial,
  type Negociacao,
  type Pdv,
  type StatusContato,
  type StatusNegociacao,
  type VisitaHistorico,
} from "@/data/poseidon";

export interface ResultadoContato {
  resultado: StatusContato;
  resumo: string;
  proximoPasso: string;
  dataRetorno: string;
  valorEstimado: string;
  dataRetirada: string;
}

export interface NovaNegociacao {
  oferta: string;
  cd: Pdv["cd"];
  valor: number;
  dataRetirada: string;
  itens: string;
  observacao: string;
  status: StatusNegociacao;
}

interface StoreValue {
  pdvs: Pdv[];
  negociacoes: Negociacao[];
  historicos: Record<string, VisitaHistorico[]>;
  contatosConcluidos: string[];
  getPdv: (id: string) => Pdv | undefined;
  registrarResultado: (pdvId: string, dados: ResultadoContato) => void;
  registrarNegociacao: (pdvId: string, dados: NovaNegociacao) => void;
  enviarRelatorio: (ids: string[]) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const historicosIniciais = (): Record<string, VisitaHistorico[]> => {
  const mapa: Record<string, VisitaHistorico[]> = {};
  for (const pdv of PDVS_INICIAIS) mapa[pdv.id] = historicoInicial(pdv.status);
  return mapa;
};

const CONTATOS_CONCLUIDOS_INICIAIS = [
  "PDV-1002",
  "PDV-1003",
  "PDV-1014",
  "PDV-1027",
  "PDV-1024",
];

export function PoseidonProvider({ children }: { children: ReactNode }) {
  const [pdvs, setPdvs] = useState<Pdv[]>(PDVS_INICIAIS);
  const [negociacoes, setNegociacoes] = useState<Negociacao[]>(NEGOCIACOES_INICIAIS);
  const [historicos, setHistoricos] = useState<Record<string, VisitaHistorico[]>>(
    historicosIniciais,
  );
  const [contatosConcluidos, setContatosConcluidos] = useState<string[]>(
    CONTATOS_CONCLUIDOS_INICIAIS,
  );

  const getPdv = useCallback((id: string) => pdvs.find((p) => p.id === id), [pdvs]);

  const registrarResultado = useCallback((pdvId: string, dados: ResultadoContato) => {
    const statusMapeado: StatusContato =
      dados.resultado === "Retorno agendado" ? "Retorno agendado" : dados.resultado;

    setPdvs((atuais) =>
      atuais.map((p) =>
        p.id === pdvId ? { ...p, status: statusMapeado, ultimoContato: "18/08/2026" } : p,
      ),
    );

    setHistoricos((atuais) => {
      const entrada: VisitaHistorico = {
        data: "18/08/2026",
        titulo: statusMapeado,
        descricao: dados.resumo.trim() || "Contato registrado no ambiente demonstrativo.",
      };
      return { ...atuais, [pdvId]: [entrada, ...(atuais[pdvId] ?? [])] };
    });

    setContatosConcluidos((atuais) =>
      atuais.includes(pdvId) ? atuais : [...atuais, pdvId],
    );
  }, []);

  const registrarNegociacao = useCallback((pdvId: string, dados: NovaNegociacao) => {
    setNegociacoes((atuais) => [
      {
        id: `NG-${3000 + atuais.length}`,
        pdvId,
        cd: dados.cd,
        oferta: dados.oferta,
        valor: dados.valor,
        dataRetirada: dados.dataRetirada || "Sem data definida",
        status: dados.status,
        observacao: dados.observacao.trim() || "Negociação registrada no ambiente demonstrativo.",
        itens: dados.itens.trim() || "Não informado",
      },
      ...atuais,
    ]);

    setHistoricos((atuais) => {
      const entrada: VisitaHistorico = {
        data: "18/08/2026",
        titulo: dados.status,
        descricao: `${dados.oferta} registrada com retirada prevista em ${dados.dataRetirada || "data a definir"}.`,
      };
      return { ...atuais, [pdvId]: [entrada, ...(atuais[pdvId] ?? [])] };
    });
  }, []);

  const enviarRelatorio = useCallback((ids: string[]) => {
    setNegociacoes((atuais) =>
      atuais.map((n) => (ids.includes(n.id) ? { ...n, status: "Enviado ao ponto focal" } : n)),
    );
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      pdvs,
      negociacoes,
      historicos,
      contatosConcluidos,
      getPdv,
      registrarResultado,
      registrarNegociacao,
      enviarRelatorio,
    }),
    [
      pdvs,
      negociacoes,
      historicos,
      contatosConcluidos,
      getPdv,
      registrarResultado,
      registrarNegociacao,
      enviarRelatorio,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function usePoseidon(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("usePoseidon deve ser usado dentro de PoseidonProvider");
  return ctx;
}
