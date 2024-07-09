import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MapsRoutingModule,
    SideMenuComponent
  ]
})
export class MapsModule { }
