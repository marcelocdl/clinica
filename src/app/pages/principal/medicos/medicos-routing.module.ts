import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { AdicionarMedicoComponent } from './adicionar/adicionar.component';

import { MedicosComponent } from './medicos.component';
import { VisualizarMedicoComponent } from './visualizar/visualizar.component';

const routes: Routes = [
 
   {
   path: '',
   component: MedicosComponent,
   children: [
      { path: 'adicionar', component: AdicionarMedicoComponent},
      { path: 'visualizar', component: VisualizarMedicoComponent},
      { path: '', redirectTo: 'visualizar', pathMatch: 'full' }
   ]
  }
];

@NgModule({
   imports: [RouterModule.forChild(routes), NgxMaskModule.forChild(), MatCommonModule],
   exports: [RouterModule],
})
export class MedicosRoutingModule {}