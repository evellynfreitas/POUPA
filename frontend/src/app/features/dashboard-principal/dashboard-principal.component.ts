import { Component, Input } from "@angular/core";
import { TransacaoDTO } from "../../shared/models/transacao-dto";
import { CommonModule } from "@angular/common";

@Component({
  selector: "dashboard-principal",
  templateUrl: "./dashboard-principal.component.html",
  styleUrl: "./dashboard-principal.component.scss",
  imports: [CommonModule]
})
export class DashboardPrincipalComponent {

  @Input() listaTransacoes: TransacaoDTO[];

  formataValor(valor: number): string {
    return valor.toLocaleString(
      "pt-br",
      {
        style: "currency",
        currency: "BRL",
      }
    );
  }

  definirTotalDespesa(transacoes: TransacaoDTO[]): number {
    const despesas = transacoes.filter(
      (transacao) => transacao.tipoTransacao.startsWith("Despesa"));
  
    return despesas.reduce((soma, transacao) => soma + transacao.valor, 0);
  }

  definirSaldoTotal(transacoes: TransacaoDTO[]): number {
    const entradas = transacoes.filter(
      (transacao) => !transacao.tipoTransacao.startsWith("Despesa"));
  
    return entradas.reduce((soma, transacao) => soma + transacao.valor, 0);
  }
  
  agruparTransacoesPorCategoria(transacoes: TransacaoDTO[]): CategoriaResumo[] {
    const despesas = transacoes.filter(
      (transacao) => transacao.tipoTransacao.startsWith("Despesa"));
  
    const totalDespesas = despesas.reduce((soma, transacao) => soma + transacao.valor, 0);
  
    const agrupadoPorCategoria = despesas.reduce((acumulado, transacao) => {
      if (!acumulado[transacao.categoria]) {
        acumulado[transacao.categoria] = 0;
      }
      acumulado[transacao.categoria] += transacao.valor;
      return acumulado;
    }, {} as Record<string, number>);
  
    return Object.entries(agrupadoPorCategoria).map(([categoria, valorTotal]) => ({
      categoria,
      valorTotal,
      percentual: totalDespesas > 0 ? (valorTotal / totalDespesas) * 100 : 0,
    }));
  }
}

interface CategoriaResumo {
  categoria: string;
  valorTotal: number;
  percentual: number;
}
