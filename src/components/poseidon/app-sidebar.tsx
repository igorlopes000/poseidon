import { Link } from "@tanstack/react-router";
import { BarChart3, Handshake, LayoutDashboard, Route as RouteIcon, Store } from "lucide-react";

const ITENS = [
  { to: "/", rotulo: "Visão geral", icone: LayoutDashboard, exato: true },
  { to: "/rota-do-dia", rotulo: "Rota do dia", icone: RouteIcon, exato: false },
  { to: "/pdvs", rotulo: "PDVs", icone: Store, exato: false },
  { to: "/negociacoes", rotulo: "Negociações", icone: Handshake, exato: false },
  { to: "/metas", rotulo: "Metas e desempenho", icone: BarChart3, exato: false },
] as const;

export function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="border-b border-sidebar-border px-5 py-5">
        <p className="text-sm font-semibold tracking-tight text-primary">market4u</p>
        <p className="mt-2 text-lg font-semibold text-sidebar-foreground">Poseidon</p>
        <p className="text-xs text-sidebar-muted">Central de Vendas</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {ITENS.map(({ to, rotulo, icone: Icone, exato }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: exato }}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-muted transition-colors hover:bg-sidebar-border hover:text-sidebar-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:font-medium data-[status=active]:text-sidebar-accent-foreground"
          >
            <Icone className="size-4" aria-hidden="true" />
            {rotulo}
          </Link>
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-5 py-4">
        <p className="text-xs font-medium text-sidebar-foreground">Ambiente demonstrativo</p>
        <p className="text-xs text-sidebar-muted">Dados mockados</p>
      </div>
    </aside>
  );
}
