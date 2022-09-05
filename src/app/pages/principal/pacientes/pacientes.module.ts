import { NgModule, RendererFactory2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PacientesComponent } from './pacientes.component';

import { VisualizarPacientesComponent } from './visualizar/visualizar.component';
import { AdicionarPacienteComponent } from './adicionar/adicionar.component';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
   declarations: [
      PacientesComponent,
      VisualizarPacientesComponent,
      AdicionarPacienteComponent
   ],
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxMaskModule.forRoot({
         dropSpecialCharacters: true
      }),
      PacientesRoutingModule
   ],
   providers: [
      
   ]
})
export class PacientesModule {}