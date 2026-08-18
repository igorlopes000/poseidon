import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { PROXIMO_PASSO, type Pdv, type StatusContato } from "@/data/poseidon";
import { usePoseidon } from "@/state/poseidon-store";

const RESULTADOS = [
  "Pedido confirmado",
  "Interesse com retorno agendado",
  "Negociação em andamento",
  "Sem interesse",
  "Não contatado",
  "Contato inválido ou indisponível",
] as const;

type ResultadoOpcao = (typeof RESULTADOS)[number];

const MAPA_STATUS: Record<ResultadoOpcao, StatusContato> = {
  "Pedido confirmado": "Pedido confirmado",
  "Interesse com retorno agendado": "Retorno agendado",
  "Negociação em andamento": "Negociação em andamento",
  "Sem interesse": "Sem interesse",
  "Não contatado": "Não contatado",
  "Contato inválido ou indisponível": "Contato indisponível",
};

export function DrawerResultado({
  pdv,
  aberto,
  onOpenChange,
  onAbrirNegociacao,
}: {
  pdv: Pdv;
  aberto: boolean;
  onOpenChange: (aberto: boolean) => void;
  onAbrirNegociacao: () => void;
}) {
  const { registrarResultado } = usePoseidon();
  const [resultado, setResultado] = useState<ResultadoOpcao>("Interesse com retorno agendado");
  const [resumo, setResumo] = useState("");
  const [proximoPasso, setProximoPasso] = useState("");
  const [dataRetorno, setDataRetorno] = useState("");
  const [valorEstimado, setValorEstimado] = useState("");
  const [dataRetirada, setDataRetirada] = useState("");

  const mostrarPedido = resultado === "Pedido confirmado";
  const mostrarRetorno = resultado === "Interesse com retorno agendado";
  const mostrarNegociacao = resultado === "Negociação em andamento";

  function salvar() {
    registrarResultado(pdv.id, {
      resultado: MAPA_STATUS[resultado],
      resumo,
      proximoPasso: proximoPasso || PROXIMO_PASSO[MAPA_STATUS[resultado]],
      dataRetorno,
      valorEstimado,
      dataRetirada,
    });
    onOpenChange(false);
    toast.success("Resultado registrado com sucesso.");
  }

  return (
    <Sheet open={aberto} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Registrar resultado do contato</SheetTitle>
          <SheetDescription>
            {pdv.nome} — {pdv.id}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label>Resultado do contato</Label>
            <Select
              value={resultado}
              onValueChange={(v) => setResultado(v as ResultadoOpcao)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RESULTADOS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resumo-contato">Resumo do contato</Label>
            <Textarea
              id="resumo-contato"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
              placeholder="Descreva o que foi tratado com o franqueado"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proximo-passo">Próximo passo</Label>
            <Input
              id="proximo-passo"
              value={proximoPasso}
              onChange={(e) => setProximoPasso(e.target.value)}
              placeholder={PROXIMO_PASSO[MAPA_STATUS[resultado]]}
            />
          </div>

          {mostrarRetorno ? (
            <div className="space-y-2">
              <Label htmlFor="data-retorno">Data de retorno</Label>
              <Input
                id="data-retorno"
                type="date"
                value={dataRetorno}
                onChange={(e) => setDataRetorno(e.target.value)}
              />
            </div>
          ) : null}

          {mostrarPedido ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="valor-estimado">Valor estimado do pedido</Label>
                <Input
                  id="valor-estimado"
                  inputMode="numeric"
                  value={valorEstimado}
                  onChange={(e) => setValorEstimado(e.target.value)}
                  placeholder="R$ 0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data-retirada">Data prevista de retirada</Label>
                <Input
                  id="data-retirada"
                  type="date"
                  value={dataRetirada}
                  onChange={(e) => setDataRetirada(e.target.value)}
                />
              </div>
            </>
          ) : null}

          {mostrarNegociacao ? (
            <Button variant="outline" className="w-full" onClick={onAbrirNegociacao}>
              Registrar negociação
            </Button>
          ) : null}
        </div>

        <SheetFooter className="mt-8 flex-row justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={salvar}>Salvar resultado</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
