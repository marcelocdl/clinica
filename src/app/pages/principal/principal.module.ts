import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { PrincipalRoutingModule } from "./principal-routing.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MenuLateralComponent } from "src/app/utils/menu-lateral/menu-lateral.component";
import { PrincipalComponent } from "./principal.component";

import { ConsultasComponent } from './consultas/consultas.component';


@NgModule({
   declarations: [
      PrincipalComponent,
      MenuLateralComponent,
   ],
   imports: [
      CommonModule,
      RouterModule,
      PrincipalRoutingModule,
      MatSidenavModule,
      NgbModule
   ],
   schemas: [
      CUSTOM_ELEMENTS_SCHEMA
   ]
})

export class PrincipalModule {}