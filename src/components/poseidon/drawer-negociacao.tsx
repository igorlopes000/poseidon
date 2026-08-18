import { useEffect, useState } from "react";
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
import { CDS, OFERTAS, type CD, type Pdv, type StatusNegociacao } from "@/data/poseidon";
import { usePoseidon } from "@/state/poseidon-store";

const STATUS: StatusNegociacao[] = [
  "Em negociação",
  "Promessa registrada",
  "Pedido confirmado",
  "Cancelada",
];

export function DrawerNegociacao({
  pdv,
  aberto,
  ofertaInicial,
  onOpenChange,
}: {
  pdv: Pdv;
  aberto: boolean;
  ofertaInicial?: string;
  onOpenChange: (aberto: boolean) => void;
}) {
  const { registrarNegociacao } = usePoseidon();
  const [oferta, setOferta] = useState(ofertaInicial ?? OFERTAS[0]!.nome);
  const [cd, setCd] = useState<CD>(pdv.cd);
  const [valor, setValor] = useState("");
  const [dataRetirada, setDataRetirada] = useState("");
  const [itens, setItens] = useState(pdv.categoria);
  const [observacao, setObservacao] = useState("");
  const [status, setStatus] = useState<StatusNegociacao>("Em negociação");

  useEffect(() => {
    if (aberto && ofertaInicial) setOferta(ofertaInicial);
  }, [aberto, ofertaInicial]);

  function salvar() {
    registrarNegociacao(pdv.id, {
      oferta,
      cd,
      valor: Number(valor.replace(/\D/g, "")) || 0,
      dataRetirada,
      itens,
      observacao,
      status,
    });
    onOpenChange(false);
    toast.success("Negociação registrada com sucesso.");
  }

  return (
    <Sheet open={aberto} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Registrar negociação</SheetTitle>
          <SheetDescription>
            {pdv.nome} — {pdv.id}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label>Oferta ou combo</Label>
            <Select value={oferta} onValueChange={setOferta}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {OFERTAS.map((o) => (
                  <SelectItem key={o.id} value={o.nome}>
                    {o.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>CD de retirada</Label>
            <Select value={cd} onValueChange={(v) => setCd(v as CD)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CDS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor-negociacao">Valor estimado</Label>
            <Input
              id="valor-negociacao"
              inputMode="numeric"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="R$ 0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="retirada-negociacao">Data prevista de retirada</Label>
            <Input
              id="retirada-negociacao"
              type="date"
              value={dataRetirada}
              onChange={(e) => setDataRetirada(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="itens-negociacao">Itens ou categorias envolvidos</Label>
            <Input
              id="itens-negociacao"
              value={itens}
              onChange={(e) => setItens(e.target.value as Pdv["categoria"])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacao-negociacao">Observação</Label>
            <Textarea
              id="observacao-negociacao"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              rows={3}
              placeholder="Informações relevantes para o ponto focal do CD"
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as StatusNegociacao)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter className="mt-8 flex-row justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={salvar}>Salvar negociação</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
