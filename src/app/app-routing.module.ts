import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/service/auth-guard';

import { LoginComponent } from './pages/login/login.component';
import { PacientesComponent } from './pages/principal/pacientes/pacientes.component';
import { PrincipalComponent } from './pages/principal/principal.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'principal', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/principal/principal.module').then(m => m.PrincipalModule)
  },
  {
    path: '**', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
