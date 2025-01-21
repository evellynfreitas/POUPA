import { CommonModule } from '@angular/common';
import { Component, Input } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { TransacaoDTO } from '../../shared/models/transacao-dto';
import { ModalDespesaComponent } from "../modal-despesa/modal-despesa.component";
import { TransacaoService } from './../../shared/services/transacao.service';

@Component({
  selector: "dashboard-despesas",
  templateUrl: "./dashboard-despesas.component.html",
  styleUrl: "./dashboard-despesas.component.scss",
  providers: [TransacaoService],
  imports: [CommonModule]
})
export class DashboardDespesasComponent {

  @Input() listaTransacoes: TransacaoDTO[];
  @Input() idUsuario: number;
  private modalRef: NgbModalRef;

  constructor(
    private readonly modalService: NgbModal
  ) {}

  abrirModalDespesa(): void {
    this.modalRef = this.modalService.open(ModalDespesaComponent, {
      size: "md"
    });

    this.modalRef.componentInstance.idUsuario = this.idUsuario;

    this.modalRef.result.then(() => {}).catch(() => {});
  }

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
}
