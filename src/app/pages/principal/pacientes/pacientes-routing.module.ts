import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { AdicionarPacienteComponent } from './adicionar/adicionar.component';
import { PacientesComponent } from './pacientes.component';
import { VisualizarPacientesComponent } from './visualizar/visualizar.component';


const routes: Routes = [
   /*{path: '', component: VisualizarPacientesComponent },
   { path: 'adicionar', component: AdicionarPacienteComponent },
   { path: 'visualizar', component: VisualizarPacientesComponent },
   { path: '', redirectTo: 'visualizar', pathMatch: 'full' } */
   {
   path: '',
   component: PacientesComponent,
   children: [
      { path: 'adicionar', component: AdicionarPacienteComponent},
      { path: 'visualizar', component: VisualizarPacientesComponent},
      { path: '', redirectTo: 'visualizar', pathMatch: 'full' }
   ]
  }
];

@NgModule({
   imports: [RouterModule.forChild(routes), NgxMaskModule.forChild()],
   exports: [RouterModule],
})
export class PacientesRoutingModule {}