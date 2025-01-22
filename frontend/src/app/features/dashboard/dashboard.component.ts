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
import { ModalConfiguracaoPeriodoAnalise } from '../modal-configuracao-periodo-analise/modal-configuracao-periodo-analise.component';

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  providers: [AuthService, TransacaoService],
  imports: [CommonModule, DashboardPrincipalComponent, DashboardDespesasComponent]
})
export class DashboardComponent {

  configuracaoPeriodoAnalise: {
    dataInicialString: string,
    dataFinalString: string,
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
        dateTimeNow.setDate(1);

        const dataInicialString = dateTimeNow.toISOString().split("T").at(0);

        dateTimeNow.setMonth(dateTimeNow.getMonth() + 1);
        dateTimeNow.setDate(dateTimeNow.getDate() - 1);
        const dataFinalString = dateTimeNow.toISOString().split("T").at(0);

        const mesString = this.definirMesString(dateTimeNow.getMonth());

        this.configuracaoPeriodoAnalise = {
          dataInicialString,
          dataFinalString,
          mesString
        }

        this.authService.getUser((response) => {
          this.usuario = response.usuario;

          this.transacaoService.getListaTransacoes(this.usuario.id, this.configuracaoPeriodoAnalise, (response) => {
            this.listaTransacoes = response.transacoes;
          }, () => {});
        }, () => {
          this.authService.clearToken();
          this.router.navigate(["entrar"]);
        });
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
    this.modalRef = this.modalService.open(ModalConfiguracaoPeriodoAnalise);

    this.modalRef.result.then((configuracao) => {
      const dateTimeNow = new Date(configuracao.dataInicialString);

      this.configuracaoPeriodoAnalise = {
        dataInicialString: configuracao.dataInicialString,
        dataFinalString: configuracao.dataFinalString,
        mesString: this.definirMesString(dateTimeNow.getMonth())
      };

      this.configuracaoPeriodoAnalise.mesString = this.definirMesString(dateTimeNow.getMonth());

      this.transacaoService.getListaTransacoes(this.usuario.id, this.configuracaoPeriodoAnalise, (response) => {
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
