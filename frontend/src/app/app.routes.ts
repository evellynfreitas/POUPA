import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { CadastroComponent } from './features/cadastro/cadastro.component';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "home",
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: "entrar",
    pathMatch: "full",
    component: LoginComponent
  },
  {
    path: "cadastro",
    pathMatch: "full",
    component: CadastroComponent
  },
  {
    path: "dashboard",
    pathMatch: "full",
    component: DashboardComponent
  }
];
