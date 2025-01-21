import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";

@Component({
  selector: "modal-mes-ano",
  templateUrl: "./modal-mes-ano.component.html",
  styleUrl: "./modal-mes-ano.component.scss",
  imports: [CommonModule, FormsModule, NgbModule]
})
export class ModalMesAnoComponent {

  mes: number;
  ano: number;

  mensagemErro: string;

  constructor(
    public readonly activeModal: NgbActiveModal
  ) {}

  salvarDespesa(): void {
    if (this.mes == null || this.mes < 0 || this.ano == null || this.ano <= 0) {
      this.mensagemErro = "Dados inválidos!";
    } else {
      this.activeModal.close({
        mesInicio: this.mes,
        anoInicio: this.ano
      });
    }
  }

}
