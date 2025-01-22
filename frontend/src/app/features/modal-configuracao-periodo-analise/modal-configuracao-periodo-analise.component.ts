import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "modal-configuracao-periodo-analise",
  templateUrl: "./modal-configuracao-periodo-analise.component.html",
  imports: [CommonModule, FormsModule, NgbModule]
})
export class ModalConfiguracaoPeriodoAnalise implements OnInit {

  @Input() dataInicialString: string;
  @Input() dataFinalString: string;

  constructor(
    public readonly activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    const dateTimeNow = new Date();
    dateTimeNow.setDate(1);

    if (this.dataInicialString == null) {
      this.dataInicialString = dateTimeNow.toISOString().split("T").at(0);
    }

    if (this.dataFinalString == null) {
      dateTimeNow.setMonth(dateTimeNow.getMonth() + 1);
      dateTimeNow.setDate(dateTimeNow.getDate() - 1);
      this.dataFinalString = dateTimeNow.toISOString().split("T").at(0);
    }
  }

  salvar(): void {
    this.activeModal.close({
      dataInicialString: this.dataInicialString,
      dataFinalString: this.dataFinalString
    });
  }

}
