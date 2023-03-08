import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { LoginComponent } from './componets/login/login.component';
import { RecoverPasswComponent } from './componets/recover-passw/recover-passw.component';
import { RegisterComponent } from './componets/register/register.component';
import { VerifyComponent } from './componets/verify/verify.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'recover-Password',
    component: RecoverPasswComponent,
  },
  {
    path: 'verify',
    component: VerifyComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path:'**',
    redirectTo: '/login',
    pathMatch: 'full',

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
