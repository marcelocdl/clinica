import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxMaskModule } from "ngx-mask";
import { AdicionarConsultaComponent } from "./adicionar/adicionar.component";
import { ConsultasComponent } from "./consultas.component";
import { VisualizarConsultaComponent } from "./visualizar/visualizar.component";

const routes: Routes = [
    
    {
    path: '',
    component: ConsultasComponent,
    children: [
       { path: 'adicionar', component: AdicionarConsultaComponent},
       { path: 'visualizar', component: VisualizarConsultaComponent},
       { path: '', redirectTo: 'visualizar', pathMatch: 'full' }
    ]
   }
 ];
 
 @NgModule({
    imports: [RouterModule.forChild(routes), NgxMaskModule.forChild()],
    exports: [RouterModule],
 })

 export class ConsultasRoutingModule {}