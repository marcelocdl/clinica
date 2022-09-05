import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { AdicionarMedicoComponent } from "./adicionar/adicionar.component";
import { MedicosRoutingModule } from "./medicos-routing.module";
import { MedicosComponent } from "./medicos.component";
import { VisualizarMedicoComponent } from "./visualizar/visualizar.component";

@NgModule({
    declarations: [
        MedicosComponent,
        AdicionarMedicoComponent,
        VisualizarMedicoComponent
     ],
     imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot({
           dropSpecialCharacters: true
        }),
        MedicosRoutingModule
     ],
     providers: [
         
     ]
})

export class MedicosModule {}