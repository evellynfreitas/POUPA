import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { DashboardPrincipalComponent } from "../dashboard-principal/dashboard-principal.component";
import { OpcaoDashboardEnum } from "./models/OpcaoDashboardEnum";
import { CommonModule } from "@angular/common";
import { DashboardDespesasComponent } from "../dashboard-despesas/dashboard-despesas.component";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  providers: [AuthService],
  imports: [CommonModule, DashboardPrincipalComponent, DashboardDespesasComponent]
})
export class DashboardComponent {

  abaAtual: OpcaoDashboardEnum = OpcaoDashboardEnum.PRINCIPAL;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.verify(() => {
      }, () => {
        this.authService.clearToken();
        this.router.navigate(["entrar"]);
      });
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

  get OpcaoDashboardEnum(): typeof OpcaoDashboardEnum {
    return OpcaoDashboardEnum
  };

}
