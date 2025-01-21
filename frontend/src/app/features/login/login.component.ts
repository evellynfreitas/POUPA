import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  providers: [AuthService],
  imports: [FormsModule]
})
export class LoginComponent implements OnInit {
  
  email: string = null;
  senha: string = null;

  mensagemErro: string;

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

  entrar(): void {
    this.authService.login({
      email: this.email,
      senha: this.senha
    }, (response) => {
      if (response.token) {
        this.authService.storeToken(response.token);
        this.router.navigate(["dashboard"]);
      }
    }, (error) => {
      this.mensagemErro = error.error.message;
    });
  }

  redirecionarCadastro(): void {
    this.router.navigate(["cadastro"]);
  }

}
