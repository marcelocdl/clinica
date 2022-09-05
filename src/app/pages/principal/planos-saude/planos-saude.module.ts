import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxMaskModule } from "ngx-mask";
import { AdicionarPlanoSaudeComponent } from "./adicionar/adicionar.component";
import { GerarPdfComponent } from "./gerar-pdf/gerar-pdf.component";
import { PlanosSaudeRoutingModule } from "./planos-saude-routing.module";
import { PlanosSaudeComponent } from "./planos-saude.component";
import { VisualizarPlanoSaudeComponent } from "./visualizar/visualizar.component";

@NgModule({
    declarations: [
       PlanosSaudeComponent,
       VisualizarPlanoSaudeComponent,
       AdicionarPlanoSaudeComponent,
       GerarPdfComponent
    ],
    imports: [
       CommonModule,
       FormsModule,
       ReactiveFormsModule,
       NgxMaskModule.forRoot({
          dropSpecialCharacters: true
       }),
       PlanosSaudeRoutingModule,
    ],
    providers: [
       
    ]
 })
 export class PlanosSaudeModule {}