import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NgxMaskModule } from "ngx-mask";

import { AdicionarSecretariaComponent } from "./adicionar/adicionar.component";
import { SecretariasComponent } from "./secretarias.component";
import { VisualizarSecretariasComponent } from "./visualizar/visualizar.component";

const routes: Routes = [
    
    {
    path: '',
    component: SecretariasComponent,
    children: [
       { path: 'adicionar', component: AdicionarSecretariaComponent},
       { path: 'visualizar', component: VisualizarSecretariasComponent},
       { path: '', redirectTo: 'visualizar', pathMatch: 'full' }
    ]
   }
 ];
 
 @NgModule({
    imports: [RouterModule.forChild(routes), NgxMaskModule.forChild()],
    exports: [RouterModule],
 })

 export class SecretariasRoutingModule {}