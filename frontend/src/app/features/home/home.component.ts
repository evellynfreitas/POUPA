import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  providers: [AuthService],
})
export class HomeComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.verify(() => {
        this.router.navigate(["dashboard"]);
      }, () => {
        this.authService.clearToken();
      });
    }
  }

  redirecionarCadastro(): void {
    this.router.navigate(["cadastro"]);
  }

  redirecionarLogin(): void {
    this.router.navigate(["entrar"]);
  }
}
