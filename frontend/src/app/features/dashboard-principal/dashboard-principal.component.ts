import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TransacaoDTO } from "../../shared/models/transacao-dto";
import { CategoriaDespesaEnum, CategoriaDespesaEnumUtil } from './../../shared/enums/categoria-despesa.enum';
import { TipoTransacaoEnum } from './../../shared/enums/tipo-despesa.enum';

@Component({
  selector: "dashboard-principal",
  templateUrl: "./dashboard-principal.component.html",
  styleUrl: "./dashboard-principal.component.scss",
  imports: [CommonModule]
})
export class DashboardPrincipalComponent {

  @Input() listaTransacoes: TransacaoDTO[];

  TipoTransacaoEnum = TipoTransacaoEnum;
  CategoriaDespesaEnumUtil = CategoriaDespesaEnumUtil;

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
      (transacao) => transacao.tipoTransacao === TipoTransacaoEnum.DESPESA_COMUM || transacao.tipoTransacao === TipoTransacaoEnum.DESPESA_FIXA);
  
    return despesas.reduce((soma, transacao) => soma + transacao.valor, 0);
  }

  definirSaldoTotal(transacoes: TransacaoDTO[]): number {
    const entradas = transacoes.filter(
      (transacao) => transacao.tipoTransacao !== TipoTransacaoEnum.DESPESA_COMUM && transacao.tipoTransacao !== TipoTransacaoEnum.DESPESA_FIXA);
  
    return entradas.reduce((soma, transacao) => soma + transacao.valor, 0);
  }
  
  agruparTransacoesPorCategoria(transacoes: TransacaoDTO[]): CategoriaResumo[] {
    const despesas = transacoes.filter(
      (transacao) => transacao.tipoTransacao === TipoTransacaoEnum.DESPESA_COMUM || transacao.tipoTransacao === TipoTransacaoEnum.DESPESA_FIXA);
  
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

  buscarLabelCategoria(categoria: string) {
    return CategoriaDespesaEnumUtil.buscarLabelCategoria(categoria as CategoriaDespesaEnum);
  }
}

interface CategoriaResumo {
  categoria: string;
  valorTotal: number;
  percentual: number;
}
