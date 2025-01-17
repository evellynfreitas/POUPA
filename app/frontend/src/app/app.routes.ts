import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  {
    path: "entrar",
    pathMatch: "full",
    component: LoginComponent
  }
];
