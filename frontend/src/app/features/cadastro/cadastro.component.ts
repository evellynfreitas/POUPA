import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: "cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrl: "./cadastro.component.scss",
  providers: [AuthService],
  imports: [FormsModule]
})
export class CadastroComponent implements OnInit {

  nome: string = null;
  email: string = null;
  senha: string = null;

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

  register(): void {
    this.authService.register({
      nome: this.nome,
      email: this.email,
      senha: this.senha
    }, () => {
      this.router.navigate(["entrar"]);
    }, (error) => {
      console.log(error);
    });
  }

}
