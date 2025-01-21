import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransacaoDTO } from "../../shared/models/transacao-dto";
import { FormsModule } from "@angular/forms";
import { TransacaoService } from "../../shared/services/transacao.service";
import { Router } from "@angular/router";

@Component({
  selector: "modal-despesa",
  templateUrl: "./modal-despesa.component.html",
  styleUrl: "./modal-despesa.component.scss",
  imports: [CommonModule, FormsModule, NgbModule]
})
export class ModalDespesaComponent {

  idUsuario: number;
  descricao: string;
  valor: number;
  categoria: string;
  tipoTransacao: string;
  isDespesaFixa: boolean;

  mensagemErro: string;

  constructor(
    public readonly activeModal: NgbActiveModal,
    private readonly transacaoService: TransacaoService,
    private readonly router: Router
  ) {}

  salvarDespesa(): void {
    const dto = new TransacaoDTO();

    dto.descricao = this.descricao;
    dto.valor = this.valor;
    dto.categoria = this.categoria;
    dto.tipoTransacao = this.tipoTransacao;
    dto.idUsuario = this.idUsuario;

    this.transacaoService.registraTransacao(dto, () => {
      this.router.navigate(["dashboard"]);
      this.activeModal.close();
    }, (error) => {
      this.mensagemErro = error.error.message;
    });
  }

}
