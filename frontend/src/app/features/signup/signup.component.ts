import { Component } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { FormsModule } from '@angular/forms';

@Component({
  selector: "signup",
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.scss",
  providers: [AuthService],
  imports: [FormsModule]
})
export class SignupComponent {

  nome: string = null;
  email: string = null;
  senha: string = null;

  constructor(
    private readonly authService: AuthService
  ) {}

  register(): void {
    this.authService.register({
      nome: this.nome,
      email: this.email,
      senha: this.senha
    }, (response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

}
