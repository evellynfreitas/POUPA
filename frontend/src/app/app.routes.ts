import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: "home",
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: "login",
    pathMatch: "full",
    component: LoginComponent
  },
  {
    path: "register",
    pathMatch: "full",
    component: SignupComponent
  }
];
