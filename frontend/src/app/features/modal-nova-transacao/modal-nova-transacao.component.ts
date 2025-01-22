import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TipoTransacaoEnum, TipoTransacaoEnumUtil } from "../../shared/enums/tipo-despesa.enum";
import { TransacaoService } from "../../shared/services/transacao.service";
import { CategoriaDespesaEnum, CategoriaDespesaEnumUtil } from '../../shared/enums/categoria-despesa.enum';
import { TransacaoDTO } from '../../shared/models/transacao-dto';

@Component({
  selector: "modal-nova-transacao.component",
  templateUrl: "./modal-nova-transacao.component.html",
  imports: [CommonModule, FormsModule, NgbModule]
})
export class ModalNovaTransacaoComponent {

  @Input() idUsuario: number;
  novaTransacao = new TransacaoDTO();
  mensagemErro: string;

  TipoTransacaoEnum = TipoTransacaoEnum;
  CategoriaDespesaEnum = CategoriaDespesaEnum;

  TipoTransacaoEnumUtil = TipoTransacaoEnumUtil;
  CategoriaDespesaEnumUtil = CategoriaDespesaEnumUtil;

  constructor(
    public readonly activeModal: NgbActiveModal,
    private readonly transacaoService: TransacaoService,
    private readonly router: Router
  ) {}

  salvar(): void {
    this.novaTransacao.idUsuario = this.idUsuario;
    this.transacaoService.registraTransacao(this.novaTransacao, () => {
      this.activeModal.close();
    }, (error) => {
      this.mensagemErro = error.error.message;
    });
  }

}
