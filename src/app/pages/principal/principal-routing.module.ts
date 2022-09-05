import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/service/auth-guard';

import { PrincipalComponent } from './principal.component';

const routes: Routes = [{
   path: '',
   component: PrincipalComponent,
   canActivate: [AuthGuard],
   children: [
      {
         path: 'pacientes',
         canActivate: [AuthGuard],
         loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule),
      },
      {
         path: 'medicos',
         canActivate: [AuthGuard],
         loadChildren: () => import('./medicos/medicos.module').then(m => m.MedicosModule),
      },
      {
         path: 'secretarias',
         canActivate: [AuthGuard],
         loadChildren: () => import('./secretarias/secretarias.module').then(m => m.SecretariasModule),
      },
      {
         path: 'planoSaude',
         canActivate: [AuthGuard],
         loadChildren: () => import('./planos-saude/planos-saude.module').then(m => m.PlanosSaudeModule),
      },
      {
         path: 'consultas',
         canActivate: [AuthGuard],
         loadChildren: () => import('./consultas/consultas.module').then(m => m.ConsultasModule),
      }
   ]
}];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class PrincipalRoutingModule {}