import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTanksComponent } from './add-tanks/add-tanks.component';
import { TanksRoutingModule } from './tanks-routing.module';
import { TanksComponent } from './tanks.component';


@NgModule({
  declarations: [
    AddTanksComponent,
    TanksComponent
  ],
  imports: [
    CommonModule,
    TanksRoutingModule,
    
  ]
})
export class TanksModule { }
