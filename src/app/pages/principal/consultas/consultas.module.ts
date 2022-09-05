import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxMaskModule } from "ngx-mask";
import { AdicionarConsultaComponent } from "./adicionar/adicionar.component";
import { ConsultasRoutingModule } from "./consultas-routing.module";
import { ConsultasComponent } from "./consultas.component";
import { VisualizarConsultaComponent } from "./visualizar/visualizar.component";

@NgModule({
    declarations: [
        ConsultasComponent,
        VisualizarConsultaComponent,
        AdicionarConsultaComponent
     ],
     imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot({
           dropSpecialCharacters: true
        }),
        ConsultasRoutingModule
     ],
     providers: [
        
     ]
})

export class ConsultasModule {}