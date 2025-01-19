import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: "entrar",
    pathMatch: "full",
    component: LoginComponent
  },
  {
    path: "cadastro",
    pathMatch: "full",
    component: SignupComponent
  }
];
