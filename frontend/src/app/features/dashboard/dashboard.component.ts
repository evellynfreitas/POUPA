import { TransacaoService } from './../../shared/services/transacao.service';
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { DashboardPrincipalComponent } from "../dashboard-principal/dashboard-principal.component";
import { OpcaoDashboardEnum } from "./models/OpcaoDashboardEnum";
import { CommonModule } from "@angular/common";
import { DashboardDespesasComponent } from "../dashboard-despesas/dashboard-despesas.component";
import { UsuarioDTO } from "../../shared/models/usuario-dto";
import { TransacaoDTO } from '../../shared/models/transacao-dto';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalMesAnoComponent } from '../modal-mes-ano/modal-mes-ano.component';

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  providers: [AuthService, TransacaoService],
  imports: [CommonModule, DashboardPrincipalComponent, DashboardDespesasComponent]
})
export class DashboardComponent {

  mesAnoFiltragem: {
    diaInicio: number,
    mesInicio: number,
    anoInicio: number,
    diaFim: number,
    mesFim: number,
    anoFim: number,
    mesString?: string
  };
  abaAtual: OpcaoDashboardEnum = OpcaoDashboardEnum.PRINCIPAL;
  usuario: UsuarioDTO;
  listaTransacoes: TransacaoDTO[];

  private modalRef: NgbModalRef;

  constructor(
    private readonly authService: AuthService,
    private readonly transacaoService: TransacaoService,
    private readonly router: Router,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.verify(() => {
        const dateTimeNow = new Date();
        const dateTimeMoreOneMonth = new Date();
        dateTimeMoreOneMonth.setMonth(dateTimeMoreOneMonth.getMonth() + 1);
  
        this.mesAnoFiltragem = {
          diaInicio: dateTimeNow.getDate(),
          mesInicio: dateTimeNow.getMonth(),
          anoInicio: dateTimeNow.getFullYear(),
          diaFim: dateTimeMoreOneMonth.getDate(),
          mesFim: dateTimeMoreOneMonth.getMonth(),
          anoFim: dateTimeMoreOneMonth.getFullYear(),
          mesString: this.definirMesString(dateTimeNow.getMonth())
        }

        this.authService.getUser((response) => {
          this.usuario = response.usuario;

          this.transacaoService.getListaTransacoes(this.usuario.id, this.mesAnoFiltragem, (response) => {
            this.listaTransacoes = response.transacoes;
          }, () => {});
        }, () => {});
      }, () => {
        this.authService.clearToken();
        this.router.navigate(["entrar"]);
      });
    } else {
      this.router.navigate(["entrar"]);
    }
  }

  alterarAbaVisualizacao(opcao: OpcaoDashboardEnum): void {
    this.abaAtual = opcao;
  }

  isAbaAtual(opcao: OpcaoDashboardEnum): boolean {
    return this.abaAtual === opcao;
  }

  logout(): void {
    this.authService.logout(() => {
      this.authService.clearToken();
      this.router.navigate(["entrar"]);
    }, (error) => {
      console.log(error);
    });
  }

  abrirModalMesAno(): void {
    this.modalRef = this.modalService.open(ModalMesAnoComponent);

    this.modalRef.result.then((mesAno) => {
      const dateTimeNow = new Date(mesAno.anoInicio, mesAno.mesInicio, 1);
      const dateTimeTwo = new Date(dateTimeNow);

      dateTimeTwo.setMonth(dateTimeTwo.getMonth() + 1);

      const mesAnoFiltragem = {
        diaInicio: dateTimeNow.getDate(),
        mesInicio: dateTimeNow.getMonth(),
        anoInicio: dateTimeNow.getFullYear(),
        diaFim: dateTimeTwo.getDate(),
        mesFim: dateTimeTwo.getMonth(),
        anoFim: dateTimeTwo.getFullYear(),
        mesString: this.definirMesString(dateTimeNow.getMonth())
      };

      this.mesAnoFiltragem = mesAnoFiltragem;

      this.transacaoService.getListaTransacoes(this.usuario.id, mesAnoFiltragem, (response) => {
        this.listaTransacoes = response.transacoes;
      }, () => {});
    }).catch(() => {});
  }

  private definirMesString(mes: number): string {
    switch (mes) {
      case 0: return "Janeiro";
      case 1: return "Fevereiro";
      case 2: return "Março";
      case 3: return "Abril";
      case 4: return "Maio";
      case 5: return "Junho";
      case 6: return "Julho";
      case 7: return "Agosto";
      case 8: return "Setembro";
      case 9: return "Outubro";
      case 10: return "Novembro";
      case 11: return "Dezembro";

      default: return null;
    }
  }

  get OpcaoDashboardEnum(): typeof OpcaoDashboardEnum {
    return OpcaoDashboardEnum
  };

}
