import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxMaskModule } from "ngx-mask";

import { AdicionarSecretariaComponent } from "./adicionar/adicionar.component";
import { SecretariasRoutingModule } from "./secretarias-routing.module";
import { SecretariasComponent } from "./secretarias.component";
import { VisualizarSecretariasComponent } from "./visualizar/visualizar.component";

@NgModule({
    declarations: [
        SecretariasComponent,
        VisualizarSecretariasComponent,
        AdicionarSecretariaComponent
     ],
     imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot({
           dropSpecialCharacters: true
        }),
        SecretariasRoutingModule
     ],
     providers: [
        
     ]
})

export class SecretariasModule {}