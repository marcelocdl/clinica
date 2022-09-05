import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxMaskModule } from "ngx-mask";
import { AuthGuard } from "src/app/core/service/auth-guard";
import { AdicionarPlanoSaudeComponent } from "./adicionar/adicionar.component";
import { GerarPdfComponent } from "./gerar-pdf/gerar-pdf.component";
import { PlanosSaudeComponent } from "./planos-saude.component";
import { VisualizarPlanoSaudeComponent } from "./visualizar/visualizar.component";

const routes: Routes = [
    
    {
    path: '',
    canActivate: [AuthGuard],
    component: PlanosSaudeComponent,
    children: [
       { path: 'adicionar', component: AdicionarPlanoSaudeComponent, canActivate: [AuthGuard],},
       { path: 'visualizar', component: VisualizarPlanoSaudeComponent, canActivate: [AuthGuard],},
       { path: 'gerar', component: GerarPdfComponent},
       { path: '', redirectTo: 'visualizar', pathMatch: 'full' }
    ]
   }
 ];
 
 @NgModule({
    imports: [RouterModule.forChild(routes), NgxMaskModule.forChild()],
    exports: [RouterModule],
 })
 export class PlanosSaudeRoutingModule {}