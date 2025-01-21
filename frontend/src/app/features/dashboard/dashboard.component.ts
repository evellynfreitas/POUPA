import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  providers: [AuthService]
})
export class DashboardComponent {

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
        this.router.navigate(["entrar"]);
      });
    }
  }
  
  logout(): void {
    this.authService.logout(() => {
      this.authService.clearToken();
      this.router.navigate(["entrar"]);
    }, (error) => {
      console.log(error);
    });
  }

}
